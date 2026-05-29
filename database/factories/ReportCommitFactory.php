<?php

namespace Database\Factories;

use App\Models\Report;
use App\Models\ReportCommit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportCommit>
 */
class ReportCommitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'report_id' => Report::factory(),
            'sha' => substr(fake()->sha1(), 0, 7),
            'message' => fake()->sentence(),
            'author_name' => fake()->name(),
            'author_email' => fake()->safeEmail(),
            'author_username' => fake()->userName(),
            'additions' => fake()->numberBetween(0, 500),
            'deletions' => fake()->numberBetween(0, 200),
            'committed_at' => now(),
            'html_url' => null,
            'position' => 0,
        ];
    }
}
