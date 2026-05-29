<?php

namespace App\Enums;

enum ReportShareStatus: string
{
    case Pending = 'pending';
    case Sent = 'sent';
    case Failed = 'failed';

    /**
     * Get the display label for the share status.
     */
    public function label(): string
    {
        return ucfirst($this->value);
    }
}
