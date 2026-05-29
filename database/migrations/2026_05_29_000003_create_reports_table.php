<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('repository_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('report_template_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('pending');
            $table->string('title');
            $table->string('repository_full_name')->nullable();
            $table->string('branch');
            $table->string('locale', 10)->default('en');
            $table->text('summary')->nullable();
            $table->string('sha_from')->nullable();
            $table->string('sha_to')->nullable();
            $table->unsignedInteger('commits_count')->default(0);
            $table->unsignedInteger('files_changed')->default(0);
            $table->unsignedInteger('additions')->default(0);
            $table->unsignedInteger('deletions')->default(0);
            $table->decimal('coverage', 5, 2)->nullable();
            $table->date('period_start')->nullable();
            $table->date('period_end')->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->text('failed_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['team_id', 'status']);
            $table->index('repository_id');
        });

        Schema::create('report_commits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained()->cascadeOnDelete();
            $table->string('sha');
            $table->text('message');
            $table->string('author_name')->nullable();
            $table->string('author_email')->nullable();
            $table->string('author_username')->nullable();
            $table->unsignedInteger('additions')->default(0);
            $table->unsignedInteger('deletions')->default(0);
            $table->timestamp('committed_at')->nullable();
            $table->string('html_url')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->index('report_id');
        });

        Schema::create('report_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->string('heading');
            $table->string('tone')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->index('report_id');
        });

        Schema::create('report_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_section_id')->constrained()->cascadeOnDelete();
            $table->text('body');
            $table->json('meta')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->index('report_section_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_items');
        Schema::dropIfExists('report_sections');
        Schema::dropIfExists('report_commits');
        Schema::dropIfExists('reports');
    }
};
