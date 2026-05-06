<?php

namespace Database\Factories;

use App\Models\Personaje;
use Illuminate\Database\Eloquent\Factories\Factory;

class PersonajeFactory extends Factory
{
    protected $model = Personaje::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->randomElement(['Mario', 'Luigi', 'Peach', 'Yoshi', 'Bowser']),
            'tipo' => $this->faker->randomElement(['Héroe', 'Aliado', 'Enemigo', 'Jefe']),
            'poder' => $this->faker->numberBetween(1, 150),
            'mundo' => $this->faker->randomElement(['Reino Champiñón', 'Mundo Lava', 'Mundo Cielo']),
        ];
    }
}
