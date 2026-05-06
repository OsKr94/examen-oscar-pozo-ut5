<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Combate;

class CombatesSeeder extends Seeder
{
    public function run()
    {
        Combate::create([
            'pokemon_local_id' => 1,
            'pokemon_visitante_id' => 2,
            'fecha' => now(),
            'resultado' => 'Ash ganó'
        ]);
    }
}
