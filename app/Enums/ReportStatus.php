<?php

namespace App\Enums;

enum ReportStatus: string
{
    case Pending = 'pending';
    case Generating = 'generating';
    case Ready = 'ready';
    case Failed = 'failed';

    /**
     * Get the display label for the status.
     */
    public function label(): string
    {
        return ucfirst($this->value);
    }

    /**
     * Determine if the report has reached a terminal state.
     */
    public function isFinished(): bool
    {
        return in_array($this, [self::Ready, self::Failed], true);
    }
}
