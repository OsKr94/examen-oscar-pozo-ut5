<?php
namespace App\Http\Controllers;

use App\Models\Entrenador;
use Illuminate\Http\Request;

class EntrenadorController extends Controller
{
    public function index()
    {
        // Listar todos los entrenadores
        return Entrenador::all();
    }

    public function store(Request $request)
    {
        // Crear un nuevo entrenador
        $entrenador = Entrenador::create($request->all());
        return response()->json($entrenador, 201);
    }

    public function show($id)
    {
        // Mostrar un entrenador específico
        return Entrenador::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        // Actualizar un entrenador
        $entrenador = Entrenador::findOrFail($id);
        $entrenador->update($request->all());
        return response()->json($entrenador, 200);
    }

    public function destroy($id)
    {
        // Eliminar un entrenador
        Entrenador::destroy($id);
        return response()->json(null, 204);
    }
}
