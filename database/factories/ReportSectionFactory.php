<?php

namespace Database\Factories;

use App\Enums\ReportSectionKey;
use App\Models\Report;
use App\Models\ReportSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportSection>
 */
class ReportSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $key = fake()->randomElement(ReportSectionKey::cases());

        return [
            'report_id' => Report::factory(),
            'key' => $key,
            'heading' => $key->label(),
            'tone' => null,
            'position' => 0,
        ];
    }
}
