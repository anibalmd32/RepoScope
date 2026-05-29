<?php

namespace App\Models;

use App\Enums\ReportShareStatus;
use Database\Factories\ReportShareFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'report_id',
    'integration_id',
    'user_id',
    'status',
    'sent_at',
    'error',
    'meta',
])]
class ReportShare extends Model
{
    /** @use HasFactory<ReportShareFactory> */
    use HasFactory;

    /**
     * Get the report that was shared.
     *
     * @return BelongsTo<Report, $this>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * Get the integration the report was shared through.
     *
     * @return BelongsTo<Integration, $this>
     */
    public function integration(): BelongsTo
    {
        return $this->belongsTo(Integration::class);
    }

    /**
     * Get the user who shared the report.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ReportShareStatus::class,
            'sent_at' => 'datetime',
            'meta' => 'array',
        ];
    }
}
