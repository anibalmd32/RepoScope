<?php

namespace App\Models;

use App\Enums\ReportSectionKey;
use Database\Factories\ReportSectionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['report_id', 'key', 'heading', 'tone', 'position'])]
class ReportSection extends Model
{
    /** @use HasFactory<ReportSectionFactory> */
    use HasFactory;

    /**
     * Get the report this section belongs to.
     *
     * @return BelongsTo<Report, $this>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * Get the items within the section.
     *
     * @return HasMany<ReportItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(ReportItem::class)->orderBy('position');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'key' => ReportSectionKey::class,
            'position' => 'integer',
        ];
    }
}
