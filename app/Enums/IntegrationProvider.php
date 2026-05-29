<?php

namespace App\Enums;

enum IntegrationProvider: string
{
    case Slack = 'slack';
    case Telegram = 'telegram';
    case Email = 'email';

    /**
     * Get the display label for the provider.
     */
    public function label(): string
    {
        return match ($this) {
            self::Slack => 'Slack',
            self::Telegram => 'Telegram',
            self::Email => 'Email',
        };
    }
}
