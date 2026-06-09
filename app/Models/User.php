<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Concerns\HasTeams;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable([
    'name',
    'email',
    'password',
    'current_team_id',
])]
#[Hidden([
    'password',
    'two_factor_secret',
    'two_factor_recovery_codes',
    'remember_token',
])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasTeams, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the OAuth accounts linked to this user.
     *
     * @return HasMany<OauthAccount, $this>
     */
    public function oauthAccounts(): HasMany
    {
        return $this->hasMany(OauthAccount::class);
    }

    /**
     * Get the reports authored by the user.
     *
     * @return HasMany<Report, $this>
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    /**
     * Get the repositories connected by the user.
     *
     * @return HasMany<Repository, $this>
     */
    public function connectedRepositories(): HasMany
    {
        return $this->hasMany(Repository::class, 'connected_by_id');
    }

    /**
     * Get the integrations connected by the user.
     *
     * @return HasMany<Integration, $this>
     */
    public function connectedIntegrations(): HasMany
    {
        return $this->hasMany(Integration::class, 'connected_by_id');
    }

    /**
     * Get the user's avatar from their primary OAuth account.
     */
    public function getAvatarAttribute(): ?string
    {
        return $this->oauthAccounts->first()?->avatar_url;
    }

    /**
     * Get a specific provider's OAuth account.
     */
    public function oauthAccountFor(string $provider): ?OauthAccount
    {
        return $this->oauthAccounts->firstWhere('provider', $provider);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
