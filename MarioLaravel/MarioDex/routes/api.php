<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonajeController;

// API MarioDex para pruebas de integración y operaciones CRUD.
Route::get('personajes', [PersonajeController::class, 'indexApi']);
Route::post('personajes', [PersonajeController::class, 'storeApi']);
Route::put('personajes/{personaje}', [PersonajeController::class, 'updateApi']);
Route::delete('personajes/{personaje}', [PersonajeController::class, 'destroyApi']);