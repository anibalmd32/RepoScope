<?php

namespace Database\Factories;

use App\Models\ReportItem;
use App\Models\ReportSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportItem>
 */
class ReportItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'report_section_id' => ReportSection::factory(),
            'body' => fake()->sentence(),
            'meta' => [],
            'position' => 0,
        ];
    }
}
