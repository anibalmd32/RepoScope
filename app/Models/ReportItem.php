<?php

namespace App\Models;

use Database\Factories\ReportItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['report_section_id', 'body', 'meta', 'position'])]
class ReportItem extends Model
{
    /** @use HasFactory<ReportItemFactory> */
    use HasFactory;

    /**
     * Get the section this item belongs to.
     *
     * @return BelongsTo<ReportSection, $this>
     */
    public function section(): BelongsTo
    {
        return $this->belongsTo(ReportSection::class, 'report_section_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'position' => 'integer',
        ];
    }
}
