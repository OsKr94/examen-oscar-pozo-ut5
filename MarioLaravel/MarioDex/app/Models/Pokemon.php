<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    use HasFactory;

    // 1.Entidades (2,5 puntos) //
    protected $table = 'pokemons'; 
    protected $fillable = ['nombre', 'tipo', 'nivel', 'entrenador_id'];
//arriba//


    // 2.Relaciones entre tablas (2,5 puntos) //
    public function entrenador()
    {
        return $this->belongsTo(Entrenador::class);
    }
    //arriba//
}
