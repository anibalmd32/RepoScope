<?php

namespace Database\Factories;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportTemplate;
use App\Models\Repository;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $owner = fake()->userName();
        $repo = fake()->slug(2);

        return [
            'team_id' => Team::factory(),
            'repository_id' => Repository::factory(),
            'user_id' => User::factory(),
            'report_template_id' => ReportTemplate::factory(),
            'status' => ReportStatus::Ready,
            'title' => fake()->sentence(4),
            'repository_full_name' => "{$owner}/{$repo}",
            'branch' => 'feat/'.fake()->slug(2),
            'locale' => 'en',
            'summary' => fake()->paragraph(),
            'sha_from' => substr(fake()->sha1(), 0, 7),
            'sha_to' => substr(fake()->sha1(), 0, 7),
            'commits_count' => fake()->numberBetween(1, 50),
            'files_changed' => fake()->numberBetween(1, 80),
            'additions' => fake()->numberBetween(10, 2000),
            'deletions' => fake()->numberBetween(0, 800),
            'coverage' => fake()->randomFloat(2, 50, 99),
            'period_start' => now()->subWeek(),
            'period_end' => now(),
            'generated_at' => now(),
            'failed_reason' => null,
        ];
    }

    /**
     * Indicate that the report is still generating.
     */
    public function generating(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReportStatus::Generating,
            'generated_at' => null,
        ]);
    }

    /**
     * Indicate that the report failed to generate.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReportStatus::Failed,
            'generated_at' => null,
            'failed_reason' => fake()->sentence(),
        ]);
    }
}
