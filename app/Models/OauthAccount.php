<?php

namespace App\Models;

use Database\Factories\OauthAccountFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'provider',
    'provider_id',
    'nickname',
    'token',
    'refresh_token',
    'expires_at',
    'avatar_url',
    'raw',
])]
#[Hidden([
    'token',
    'refresh_token',
])]
class OauthAccount extends Model
{
    /** @use HasFactory<OauthAccountFactory> */
    use HasFactory;

    /**
     * Get the user that owns this OAuth account.
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
            'token' => 'encrypted',
            'refresh_token' => 'encrypted',
            'expires_at' => 'datetime',
            'raw' => 'array',
        ];
    }
}
