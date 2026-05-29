<?php

namespace Database\Factories;

use App\Enums\IntegrationProvider;
use App\Models\Integration;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Integration>
 */
class IntegrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $provider = fake()->randomElement(IntegrationProvider::cases());

        return [
            'team_id' => Team::factory(),
            'connected_by_id' => User::factory(),
            'provider' => $provider,
            'name' => $provider->label().' · '.fake()->word(),
            'config' => [],
            'status' => 'connected',
            'connected_at' => now(),
        ];
    }
}
