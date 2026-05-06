<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Llamo a los seeders que cree para insertar datos
        $this->call([
            EntrenadoresSeeder::class,
            PokemonsSeeder::class,
            CombatesSeeder::class,
        ]);
    }
}
