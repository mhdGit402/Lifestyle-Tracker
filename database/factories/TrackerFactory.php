<?php

namespace Database\Factories;

use App\Models\Lifestyle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tracker>
 */
class TrackerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lifestyle = Lifestyle::pluck('id');
        // Generate a fake object with dynamic keys and random boolean values
        $fakeItems = [];
        for ($i = 1; $i <= 5; $i++) { // Adjust the number of items as needed
            $fakeItems['item' . $i] = $this->faker->boolean(); // Random true/false
        }

        return [
            "submitted_date" => fake()->dateTimeBetween("now", "+1 year"),
            "items" => json_encode($fakeItems),
            "lifestyle_id" => $lifestyle->random(),
        ];
    }
}
