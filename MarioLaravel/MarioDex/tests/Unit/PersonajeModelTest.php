<?php

namespace Tests\Unit;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajeModelTest extends TestCase
{
    use RefreshDatabase;

    // Tipo de test: Unitario (mock). Comprueba la creación de un personaje Mario.(creación de personaje)
    public function test_crea_un_personaje_en_base_de_datos()
    {
        $personaje = Personaje::factory()->create([
            'nombre' => 'Mario',
            'tipo' => 'Héroe',
            'poder' => 100,
            'mundo' => 'Reino Champiñón',
        ]);

        $this->assertDatabaseHas('personajes', ['id' => $personaje->id, 'nombre' => 'Mario']);
    }

    // Tipo de test: Unitario (mock). Comprueba actualización de datos de un personaje.(actualizacion de datos)
    public function test_actualiza_datos_de_un_personaje()
    {
        $personaje = Personaje::factory()->create(['nombre' => 'Luigi']);

        $personaje->update([
            'nombre' => 'Luigi Verde',
            'tipo' => 'Héroe',
            'poder' => 92,
            'mundo' => 'Reino Champiñón',
        ]);

        $this->assertDatabaseHas('personajes', [
            'id' => $personaje->id,
            'nombre' => 'Luigi Verde',
            'poder' => 92,
        ]);
    }

    // Tipo de test: Unitario (mock). Comprueba eliminación de registros.(eliminacion de registro)
    public function test_elimina_un_personaje()
    {
        $personaje = Personaje::factory()->create();
        $id = $personaje->id;

        $personaje->delete();

        $this->assertDatabaseMissing('personajes', ['id' => $id]);
    }
}
