<?php

namespace App\Models;

use Database\Factories\ReportCommitFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'report_id',
    'sha',
    'message',
    'author_name',
    'author_email',
    'author_username',
    'additions',
    'deletions',
    'committed_at',
    'html_url',
    'position',
])]
class ReportCommit extends Model
{
    /** @use HasFactory<ReportCommitFactory> */
    use HasFactory;

    /**
     * Get the report this commit belongs to.
     *
     * @return BelongsTo<Report, $this>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'additions' => 'integer',
            'deletions' => 'integer',
            'position' => 'integer',
            'committed_at' => 'datetime',
        ];
    }
}
