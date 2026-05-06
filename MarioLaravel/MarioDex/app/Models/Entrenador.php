<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrenador extends Model
{
    use HasFactory;

    //1  .Entidades (2,5 puntos)//
    protected $table = 'entrenadores';
    protected $fillable = ['nombre', 'ciudad', 'edad'];
//arriba//

//2.Relaciones entre tablas (2,5 puntos) //

    public function pokemons()
    {
        return $this->hasMany(Pokemon::class);
    }
    //arriba//
}
