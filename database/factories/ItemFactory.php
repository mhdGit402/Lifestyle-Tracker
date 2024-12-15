<?php

namespace Database\Factories;

use App\Models\Lifestyle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lifestyle = Lifestyle::pluck('id');

        return [
            "title" => fake()->word(),
            "lifestyle_id" => $lifestyle->random(),
        ];
    }
}
