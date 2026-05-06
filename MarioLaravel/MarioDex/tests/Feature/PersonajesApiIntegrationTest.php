<?php

namespace Tests\Feature;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajesApiIntegrationTest extends TestCase
{
    use RefreshDatabase;

    // Tipo de test: Integración Laravel (mock). Comprueba GET /api/personajes con estado 200.
    public function test_get_api_personajes_devuelve_200()
    {
        Personaje::factory()->count(2)->create();

        $response = $this->getJson('/api/personajes');

        $response->assertStatus(200);
    }

    // Tipo de test: Integración Laravel (mock). Comprueba estructura JSON de la respuesta.
    public function test_get_api_personajes_devuelve_estructura_json_correcta()
    {
        Personaje::factory()->create([
            'nombre' => 'Yoshi',
            'tipo' => 'Aliado',
            'poder' => 85,
            'mundo' => 'Mundo Cielo',
        ]);

        $response = $this->getJson('/api/personajes');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'nombre', 'tipo', 'poder', 'mundo', 'created_at', 'updated_at']
            ]);
    }
}
