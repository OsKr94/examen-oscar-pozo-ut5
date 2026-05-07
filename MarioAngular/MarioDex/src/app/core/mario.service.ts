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

  private subject = new BehaviorSubject<Personaje[]>([]);

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
