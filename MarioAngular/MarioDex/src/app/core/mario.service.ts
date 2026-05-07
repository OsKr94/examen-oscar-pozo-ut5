import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Personaje {
  id?: number;
  nombre: string;
  tipo: string;
  nivelPoder: number;
}

@Injectable({
  providedIn: 'root'
})
export class MarioService {

  private subject = new BehaviorSubject<Personaje[]>([
    { id: 1, nombre: 'Mario', tipo: 'Heroe', nivelPoder: 100 },
    { id: 2, nombre: 'Luigi', tipo: 'Heroe', nivelPoder: 90 },
    { id: 3, nombre: 'Peach', tipo: 'Aliada', nivelPoder: 80 }
  ]);

  personajes$ = this.subject.asObservable();

  setPersonajes(personajes: Personaje[]): void {
    this.subject.next(personajes);
  }

  addPersonaje(personaje: Personaje): boolean {
    if (!personaje.nombre?.trim() || !personaje.tipo?.trim() || personaje.nivelPoder < 1) {
      return false;
    }

    const nuevo: Personaje = {
      ...personaje,
      id: Date.now()
    };
    this.subject.next([...this.subject.value, nuevo]);
    return true;
  }

  addPersonajeDirecto(personaje: Personaje): void {
    this.subject.next([...this.subject.value, personaje]);
  }

  eliminarPersonaje(personaje: Personaje): void {
    this.subject.next(this.subject.value.filter(p => p.id !== personaje.id));
  }
}
