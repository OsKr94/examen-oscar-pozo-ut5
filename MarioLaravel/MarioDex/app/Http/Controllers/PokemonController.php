<?php
namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    // 4 .Controladores y rutas (2,5 puntos) con enseñar index,store,destro vale //
    public function index()
    {
        // Listar todos los pokemons
        return Pokemon::with('entrenador')->get();  // Incluye la relación con entrenador
    }

    public function store(Request $request)
    {
        // Crear un nuevo pokemon
        $pokemon = Pokemon::create($request->all());
        return response()->json($pokemon, 201);
    }

    public function show($id)
    {
        // Mostrar un pokemon específico
        return Pokemon::with('entrenador')->findOrFail($id);  // Incluye la relación con entrenador
    }

    public function update(Request $request, $id)
    {
        // Actualizar un pokemon
        $pokemon = Pokemon::findOrFail($id);
        $pokemon->update($request->all());
        return response()->json($pokemon, 200);
    }

    public function destroy($id)
    {
        // Eliminar un pokemon
        Pokemon::destroy($id);
        return response()->json(null, 204);
    }
}
