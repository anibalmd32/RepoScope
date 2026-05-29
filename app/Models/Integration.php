<?php

namespace App\Models;

use App\Enums\IntegrationProvider;
use Database\Factories\IntegrationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'team_id',
    'connected_by_id',
    'provider',
    'name',
    'config',
    'status',
    'connected_at',
])]
class Integration extends Model
{
    /** @use HasFactory<IntegrationFactory> */
    use HasFactory;

    /**
     * Get the team that owns the integration.
     *
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the user who connected the integration.
     *
     * @return BelongsTo<User, $this>
     */
    public function connectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'connected_by_id');
    }

    /**
     * Get the share records routed through this integration.
     *
     * @return HasMany<ReportShare, $this>
     */
    public function shares(): HasMany
    {
        return $this->hasMany(ReportShare::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'provider' => IntegrationProvider::class,
            'config' => 'encrypted:array',
            'connected_at' => 'datetime',
        ];
    }
}
