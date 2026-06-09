<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Teams\CreateTeam;
use App\Http\Controllers\Controller;
use App\Models\OauthAccount;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class GitHubController extends Controller
{
    public function __construct(private CreateTeam $createTeam)
    {
        //
    }

    /**
     * Redirect the user to the GitHub OAuth page.
     */
    public function redirect(): RedirectResponse
    {
        /** @var GithubProvider $driver */
        $driver = Socialite::driver('github');

        return $driver
            ->scopes(['read:user', 'repo'])
            ->redirect();
    }

    /**
     * Handle the callback from GitHub.
     */
    public function callback(): RedirectResponse
    {
        /** @var \Laravel\Socialite\Two\User $githubUser */
        $githubUser = Socialite::driver('github')->user();

        // Check if this GitHub account is already linked
        $oauthAccount = OauthAccount::where('provider', 'github')
            ->where('provider_id', $githubUser->getId())
            ->first();

        if ($oauthAccount) {
            // Existing GitHub account — update token and login
            $this->updateOauthToken($oauthAccount, $githubUser);
            $this->loginAndRedirect($oauthAccount->user);

            return redirect()->intended(route('home', absolute: false));
        }

        // Try to match by email
        $user = User::where('email', $githubUser->getEmail())->first();

        if ($user) {
            // Existing email user — link GitHub account
            $this->linkOauthAccount($user, $githubUser);
            $this->loginAndRedirect($user);

            return redirect()->intended(route('home', absolute: false));
        }

        // Brand new user — create account with OAuth account
        $user = DB::transaction(function () use ($githubUser) {
            $user = User::create([
                'name' => $githubUser->getName() ?? $githubUser->getNickname() ?? 'GitHub User',
                'email' => $githubUser->getEmail(),
                'password' => null,
                'email_verified_at' => now(),
            ]);

            $user->oauthAccounts()->create([
                'provider' => 'github',
                'provider_id' => $githubUser->getId(),
                'nickname' => $githubUser->getNickname(),
                'token' => $githubUser->token,
                'refresh_token' => $githubUser->refreshToken,
                'avatar_url' => $githubUser->getAvatar(),
            ]);

            $this->createTeam->handle($user, $user->name."'s Team", isPersonal: true);

            return $user;
        });

        $this->loginAndRedirect($user);

        return redirect()->intended(route('home', absolute: false));
    }

    /**
     * Update the OAuth token for an existing account.
     */
    private function updateOauthToken(OauthAccount $oauthAccount, \Laravel\Socialite\Two\User $githubUser): void
    {
        $oauthAccount->update([
            'token' => $githubUser->token,
            'refresh_token' => $githubUser->refreshToken,
            'avatar_url' => $githubUser->getAvatar() ?? $oauthAccount->avatar_url,
            'nickname' => $githubUser->getNickname() ?? $oauthAccount->nickname,
        ]);
    }

    /**
     * Link a GitHub account to an existing user by email.
     */
    private function linkOauthAccount(User $user, \Laravel\Socialite\Two\User $githubUser): void
    {
        $user->oauthAccounts()->create([
            'provider' => 'github',
            'provider_id' => $githubUser->getId(),
            'nickname' => $githubUser->getNickname(),
            'token' => $githubUser->token,
            'refresh_token' => $githubUser->refreshToken,
            'avatar_url' => $githubUser->getAvatar(),
        ]);
    }

    /**
     * Log in the user and switch to their personal/current team.
     */
    private function loginAndRedirect(User $user): void
    {
        Auth::login($user);

        // Ensure user has a current team context
        if (! $user->currentTeam) {
            $personalTeam = $user->personalTeam();

            if ($personalTeam) {
                $user->switchTeam($personalTeam);
            }
        }
    }
}
