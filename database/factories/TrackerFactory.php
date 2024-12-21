<?php

namespace Database\Factories;

use App\Models\Item;
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
        $items =  Item::pluck('id')->toArray();

        // Limit to only 3 items
        $limitedItems = array_slice($items, 0, 3);

        $fakeItems = array_map(function ($item) {
            return [
                // collect($item)->random() => fake()->boolean() // Random true/false
                collect($item)->random() => true // Random true/false
            ];
        }, $limitedItems);

        // Generate a fake object with dynamic keys and random boolean values
        // $fakeItems = [];
        // for ($i = 1; $i <= 5; $i++) { // Adjust the number of items as needed
        //     $fakeItems[$items->random()] = $this->faker->boolean(); // Random true/false
        // }

        return [
            "submitted_date" => fake()->dateTimeBetween("now", "+1 year"),
            "items" => json_encode($fakeItems),
            "lifestyle_id" => $lifestyle->random(),
        ];
    }
}
