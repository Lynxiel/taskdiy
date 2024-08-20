<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->has(
            Board::factory(random_int(3,5))
        )->create();

    
    }
}
