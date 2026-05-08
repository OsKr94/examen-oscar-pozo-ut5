import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarioService, Personaje } from '../../../core/mario.service';
import { MarioApiService } from '../../../core/mario-api.service';
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

  constructor(
    private marioService: MarioService,
    @Optional() private marioApiService: MarioApiService
  ) {}

  ngOnInit(): void {
    this.marioService.personajes$.subscribe(lista => this.personajes = lista);

    // Solo llama al backend si HttpClient está disponible (producción o test de integración).
    if (!this.marioApiService?.hasHttp()) { return; }
    this.marioApiService.getPersonajes().subscribe({
      next: (listaApi: any[]) => {
        const personajesApi: Personaje[] = (listaApi ?? []).map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          tipo: p.tipo,
          nivelPoder: Number(p.nivelPoder ?? p.poder ?? 0),
          mundo: p.mundo ?? 'Desconocido'
        }));
        this.marioService.setPersonajes(personajesApi);
      },
      error: () => {
        // No bloquea la app si la API no está disponible temporalmente.
      }
    });
  }

  abrirModal() { this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  eliminarPersonaje(personaje: Personaje) {
    this.marioService.eliminarPersonaje(personaje);

    if (this.marioApiService && personaje.id) {
      this.marioApiService.deletePersonaje(personaje.id).subscribe({
        next: () => {},
        error: () => {}
      });
    }
  }
}
