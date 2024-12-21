<?php

namespace Database\Seeders;

use App\Models\Lifestyle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LifestyleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lifestyle::factory(1000)->create();
    }
}
