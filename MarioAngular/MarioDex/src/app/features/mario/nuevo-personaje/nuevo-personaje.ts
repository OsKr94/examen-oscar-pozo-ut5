import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarioService, Personaje } from '../../../core/mario.service';

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
    nivelPoder: 0
  };

  constructor(private marioService: MarioService) {}

  guardar() {
    if (this.nuevoPersonaje.nombre && this.nuevoPersonaje.tipo && this.nuevoPersonaje.nivelPoder > 0) {
      this.marioService.addPersonaje({ ...this.nuevoPersonaje });
      this.nuevoPersonaje = { nombre: '', tipo: '', nivelPoder: 0 };
      this.cancelar.emit();
    }
  }
}
