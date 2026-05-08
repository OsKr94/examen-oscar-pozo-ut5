import { Component, Output, EventEmitter, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarioService, Personaje } from '../../../core/mario.service';
import { MarioApiService } from '../../../core/mario-api.service';

@Component({
  selector: 'app-nuevo-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-personaje.html',
  styleUrls: ['./nuevo-personaje.css']
})
export class NuevoPersonajeComponent {
  @Output() cancelar = new EventEmitter<void>();

  nuevoPersonaje: Personaje = {
    nombre: '',
    tipo: '',
    nivelPoder: 0,
    mundo: ''
  };

  constructor(
    private marioService: MarioService,
    @Optional() private marioApiService: MarioApiService
  ) {}

  guardar() {
    if (this.nuevoPersonaje.nombre && this.nuevoPersonaje.tipo && this.nuevoPersonaje.nivelPoder > 0) {
      const personaje = { ...this.nuevoPersonaje };

      if (this.marioApiService?.hasHttp()) {
        this.marioApiService.addPersonaje(personaje).subscribe({
          next: (guardado) => this.marioService.addPersonajeDirecto(guardado),
          error: () => this.marioService.addPersonaje(personaje)
        });
      } else {
        this.marioService.addPersonaje(personaje);
      }

      this.nuevoPersonaje = { nombre: '', tipo: '', nivelPoder: 0, mundo: '' };
      this.cancelar.emit();
    }
  }
}
