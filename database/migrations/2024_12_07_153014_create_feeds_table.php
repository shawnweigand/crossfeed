<?php

use App\Enums\IconColorEnum;
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
        Schema::create('feeds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('user_id');
            $table->boolean('selected')->default(false);
            $table->enum('icon_bg_color', IconColorEnum::getValues())->default(IconColorEnum::GRAY);
            $table->enum('icon_text_color', IconColorEnum::getValues())->default(IconColorEnum::WHITE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feeds');
    }
};
