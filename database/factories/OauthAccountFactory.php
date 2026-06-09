<?php

namespace Database\Factories;

use App\Models\OauthAccount;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OauthAccount>
 */
class OauthAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'provider' => 'github',
            'provider_id' => (string) fake()->unique()->randomNumber(8),
            'nickname' => fake()->userName(),
            'token' => 'gho_'.fake()->sha256(),
            'refresh_token' => fake()->boolean(30) ? 'ghr_'.fake()->sha256() : null,
            'expires_at' => null,
            'avatar_url' => fake()->imageUrl(200, 200, 'people'),
            'raw' => null,
        ];
    }

    /**
     * Indicate that the OAuth account is for GitHub.
     */
    public function github(): static
    {
        return $this->state(fn (array $attributes) => [
            'provider' => 'github',
        ]);
    }

    /**
     * Indicate that the OAuth account is for GitLab.
     */
    public function gitlab(): static
    {
        return $this->state(fn (array $attributes) => [
            'provider' => 'gitlab',
        ]);
    }

    /**
     * Indicate that the OAuth account is for Google.
     */
    public function google(): static
    {
        return $this->state(fn (array $attributes) => [
            'provider' => 'google',
        ]);
    }
}
