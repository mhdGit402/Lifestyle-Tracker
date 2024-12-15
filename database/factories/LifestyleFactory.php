<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lifestyle>
 */
class LifestyleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::pluck('id');

        return [
            "title" => fake()->word(),
            "start_date" => fake()->dateTimeBetween('now', 'now'),
            "end_date" => fake()->dateTimeBetween('now', '+1 year'),
            "user_id" => $user->random()
        ];
    }
}
