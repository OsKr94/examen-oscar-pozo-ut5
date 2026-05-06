import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarioService, Personaje } from '../../../core/mario.service';
import { PersonajeItemComponent } from '../personaje-item/personaje-item';
import { NuevoPersonajeComponent } from '../nuevo-personaje/nuevo-personaje';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mario-dex-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PersonajeItemComponent, NuevoPersonajeComponent],
  templateUrl: './mario-dex-page.html',
  styleUrls: ['./mario-dex-page.css']
})
export class MarioDexPageComponent implements OnInit {

  personajes: Personaje[] = [];
  mostrarModal = false;

  constructor(private marioService: MarioService) {}

  ngOnInit(): void {
    this.marioService.personajes$.subscribe(lista => this.personajes = lista);
  }

  abrirModal() { this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  eliminarPersonaje(personaje: Personaje) {
    this.marioService.eliminarPersonaje(personaje);
  }
}
