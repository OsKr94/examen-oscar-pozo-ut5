<?php

namespace App\Http\Controllers;

use App\Models\Personaje;
use Illuminate\Http\Request;

class PersonajeController extends Controller
{
    private function rules(): array
    {
        return [
            'nombre' => 'required|min:3',
            'tipo' => 'required',
            'poder' => 'required|numeric|min:1',
            'mundo' => 'required',
        ];
    }

    private function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.min'      => 'El nombre debe tener al menos 3 caracteres.',
            'tipo.required'   => 'El tipo es obligatorio.',
            'poder.required'  => 'El poder es obligatorio.',
            'poder.numeric'   => 'El poder debe ser un número.',
            'poder.min'       => 'El poder debe ser mayor o igual que 1.',
            'mundo.required'  => 'El mundo es obligatorio.',
        ];
    }

    public function create()
    {
        return view('personaje.create');
    }

    public function store(Request $request)
    {
        $request->validate($this->rules(), $this->messages());

        Personaje::create($request->all());

        return redirect()->route('personaje.create')->with('success', 'Personaje registrado correctamente.');
    }

    public function indexApi()
    {
        return response()->json(Personaje::all());
    }

    public function storeApi(Request $request)
    {
        $data = $request->validate([
            'nombre'     => 'required|min:3',
            'tipo'       => 'required',
            'nivelPoder' => 'nullable|numeric|min:1',
            'poder'      => 'nullable|numeric|min:1',
            'mundo'      => 'nullable|string',
        ]);

        $personaje = Personaje::create([
            'nombre' => $data['nombre'],
            'tipo'   => $data['tipo'],
            'poder'  => $data['nivelPoder'] ?? $data['poder'] ?? 1,
            'mundo'  => $data['mundo'] ?? 'Desconocido',
        ]);

        return response()->json($personaje, 201);
    }

    public function updateApi(Request $request, Personaje $personaje)
    {
        $data = $request->validate($this->rules(), $this->messages());
        $personaje->update($data);

        return response()->json($personaje->fresh(), 200);
    }

    public function destroyApi(Personaje $personaje)
    {
        $personaje->delete();

        return response()->json(['message' => 'Personaje eliminado'], 200);
    }
}
