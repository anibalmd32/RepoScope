<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $user = auth()->user();

    if (! $user) {
        return redirect()->route('login');
    }

    $team = $user->currentTeam;

    return $team
        ? redirect()->route('dashboard', ['current_team' => $team->slug])
        : redirect()->route('teams.index');
})->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');

        // RepoScope — reports
        Route::inertia('reports', 'reports/index')->name('reports.index');
        Route::inertia('reports/new', 'reports/new')->name('reports.new');
        Route::get('reports/{report}', fn (string $current_team, string $report) => Inertia::render('reports/show', [
            'reportId' => $report,
        ]))->name('reports.show');

        // RepoScope — repositories & team workspace
        Route::inertia('repositories', 'repositories/index')->name('repositories.index');
        Route::inertia('team', 'team/index')->name('team.index');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
