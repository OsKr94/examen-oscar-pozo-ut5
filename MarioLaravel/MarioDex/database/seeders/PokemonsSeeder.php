<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pokemon;

class PokemonsSeeder extends Seeder
{
    public function run()
    {
        Pokemon::create(['nombre' => 'Pikachu', 'tipo' => 'Eléctrico', 'nivel' => 10, 'entrenador_id' => 1]);
        Pokemon::create(['nombre' => 'Squirtle', 'tipo' => 'Agua', 'nivel' => 8, 'entrenador_id' => 2]);
    }
}
