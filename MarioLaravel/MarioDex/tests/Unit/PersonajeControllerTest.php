<?php

namespace Tests\Unit;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajeControllerTest extends TestCase
{
    use RefreshDatabase;

    // Tipo de test: Unitario. Comprueba creación de personaje.
    public function test_store_crea_un_personaje_valido()
    {
        $response = $this->post(route('personaje.store'), [
            'nombre' => 'Bowser',
            'tipo' => 'Jefe',
            'poder' => 120,
            'mundo' => 'Mundo Lava',
        ]);

        $response->assertRedirect(route('personaje.create'));
        $this->assertDatabaseHas('personajes', ['nombre' => 'Bowser', 'tipo' => 'Jefe']);
    }

    // Tipo de test: Unitario. Comprueba validación de datos inválidos.
    public function test_store_falla_con_datos_invalidos()
    {
        $response = $this->from(route('personaje.create'))->post(route('personaje.store'), [
            'nombre' => 'Bo',
            'tipo' => '',
            'poder' => 0,
            'mundo' => '',
        ]);

        $response->assertRedirect(route('personaje.create'));
        $response->assertSessionHasErrors(['nombre', 'tipo', 'poder', 'mundo']);
    }
}
