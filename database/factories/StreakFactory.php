<?php

namespace Database\Factories;

use App\Models\Lifestyle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Streak>
 */
class StreakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::pluck('id');
        $lifestyle = Lifestyle::pluck('id');

        return [
            "streak_time" => fake()->word(),
            "user_id" => $user->random(),
            "lifestyle_id" => $lifestyle->random(),
        ];
    }
}
