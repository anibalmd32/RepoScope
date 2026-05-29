<?php

namespace Database\Factories;

use App\Models\Repository;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Repository>
 */
class RepositoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $owner = fake()->userName();
        $name = fake()->slug(2);

        return [
            'team_id' => Team::factory(),
            'connected_by_id' => User::factory(),
            'provider' => 'github',
            'external_id' => (string) fake()->unique()->numberBetween(1000, 9999999),
            'full_name' => "{$owner}/{$name}",
            'name' => $name,
            'owner' => $owner,
            'description' => fake()->sentence(),
            'is_private' => true,
            'default_branch' => 'main',
            'html_url' => "https://github.com/{$owner}/{$name}",
            'pushed_at' => now(),
            'synced_at' => now(),
        ];
    }

    /**
     * Indicate that the repository is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_private' => false,
        ]);
    }
}
