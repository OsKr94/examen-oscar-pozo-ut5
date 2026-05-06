<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combate extends Model
{
    use HasFactory;

    protected $fillable = ['pokemon_local_id', 'pokemon_visitante_id', 'fecha', 'resultado'];

// 2.Relaciones entre tablas (2,5 puntos) //

    public function pokemonLocal()
    {
        return $this->belongsTo(Pokemon::class, 'pokemon_local_id');
    }

    public function pokemonVisitante()
    {
        return $this->belongsTo(Pokemon::class, 'pokemon_visitante_id');
    }
    //arriba//
}
