<?php

namespace Database\Seeders;

use App\Models\ReportTemplate;
use Illuminate\Database\Seeder;

class ReportTemplateSeeder extends Seeder
{
    /**
     * Seed the built-in report templates.
     */
    public function run(): void
    {
        ReportTemplate::updateOrCreate(
            ['key' => 'weekly-progress'],
            [
                'name' => 'Weekly progress',
                'version' => 1,
                'description' => 'Summarizes what shipped, what improved, opportunities, and release notes for a stretch of work.',
                'is_active' => true,
                'definition' => [
                    'sections' => [
                        ['key' => 'shipped', 'heading' => 'What shipped', 'tone' => 'signal'],
                        ['key' => 'improved', 'heading' => 'What improved', 'tone' => 'info'],
                        ['key' => 'opportunities', 'heading' => 'Worth a closer look', 'tone' => 'warn'],
                        ['key' => 'notes', 'heading' => 'Release notes', 'tone' => null],
                    ],
                ],
            ],
        );
    }
}
