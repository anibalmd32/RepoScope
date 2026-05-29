<?php

namespace Database\Factories;

use App\Enums\ReportShareStatus;
use App\Models\Integration;
use App\Models\Report;
use App\Models\ReportShare;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportShare>
 */
class ReportShareFactory extends Factory
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
            'integration_id' => Integration::factory(),
            'user_id' => User::factory(),
            'status' => ReportShareStatus::Sent,
            'sent_at' => now(),
            'error' => null,
            'meta' => [],
        ];
    }
}
