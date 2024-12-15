<?php

namespace Database\Seeders;

use App\Models\Tracker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrackerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tracker::factory(20)->create();
    }
}
