<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Database\Factories\ReportFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'team_id',
    'repository_id',
    'user_id',
    'report_template_id',
    'status',
    'title',
    'repository_full_name',
    'branch',
    'locale',
    'summary',
    'sha_from',
    'sha_to',
    'commits_count',
    'files_changed',
    'additions',
    'deletions',
    'coverage',
    'period_start',
    'period_end',
    'generated_at',
    'failed_reason',
])]
class Report extends Model
{
    /** @use HasFactory<ReportFactory> */
    use HasFactory, SoftDeletes;

    /**
     * Get the team that owns the report.
     *
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the repository the report was generated from.
     *
     * @return BelongsTo<Repository, $this>
     */
    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    /**
     * Get the user who authored the report.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the template used to render the report.
     *
     * @return BelongsTo<ReportTemplate, $this>
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(ReportTemplate::class, 'report_template_id');
    }

    /**
     * Get the commits included in the report.
     *
     * @return HasMany<ReportCommit, $this>
     */
    public function commits(): HasMany
    {
        return $this->hasMany(ReportCommit::class)->orderBy('position');
    }

    /**
     * Get the narrative sections of the report.
     *
     * @return HasMany<ReportSection, $this>
     */
    public function sections(): HasMany
    {
        return $this->hasMany(ReportSection::class)->orderBy('position');
    }

    /**
     * Get the share records for the report.
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
            'status' => ReportStatus::class,
            'commits_count' => 'integer',
            'files_changed' => 'integer',
            'additions' => 'integer',
            'deletions' => 'integer',
            'coverage' => 'decimal:2',
            'period_start' => 'date',
            'period_end' => 'date',
            'generated_at' => 'datetime',
        ];
    }
}
