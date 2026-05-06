<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entrenador;

class EntrenadoresSeeder extends Seeder
{
    public function run()
    {
        Entrenador::create(['nombre' => 'Ash Ketchum', 'ciudad' => 'Pallet Town', 'edad' => 15]);
        Entrenador::create(['nombre' => 'Misty', 'ciudad' => 'Cerulean City', 'edad' => 14]);
    }
}
