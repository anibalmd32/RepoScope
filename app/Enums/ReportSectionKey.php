<?php

namespace App\Enums;

enum ReportSectionKey: string
{
    case Shipped = 'shipped';
    case Improved = 'improved';
    case Opportunities = 'opportunities';
    case Notes = 'notes';

    /**
     * Get the default English heading for the section.
     * The UI localizes headings; this is a sensible fallback.
     */
    public function label(): string
    {
        return match ($this) {
            self::Shipped => 'What shipped',
            self::Improved => 'What improved',
            self::Opportunities => 'Worth a closer look',
            self::Notes => 'Release notes',
        };
    }
}
