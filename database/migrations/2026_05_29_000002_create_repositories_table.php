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
        Schema::create('repositories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('connected_by_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('provider')->default('github');
            $table->string('external_id');
            $table->string('full_name');
            $table->string('name');
            $table->string('owner')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_private')->default(true);
            $table->string('default_branch')->default('main');
            $table->string('html_url')->nullable();
            $table->timestamp('pushed_at')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();

            $table->unique(['provider', 'external_id']);
            $table->index('team_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repositories');
    }
};
