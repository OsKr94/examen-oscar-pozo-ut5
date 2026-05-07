import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Personaje } from './mario.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarioApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl?.replace(/\/+$/, '') ?? '';
  private readonly apiUrl = `${this.apiBaseUrl}/api/personajes`;

  constructor(@Optional() private http: HttpClient | null) {}

  getPersonajes(): Observable<Personaje[]> {
    if (!this.http) {
      return of([]);
    }
    return this.http.get<Personaje[]>(this.apiUrl);
  }

  addPersonaje(personaje: Personaje): Observable<Personaje> {
    if (!this.http) {
      return of(personaje);
    }
    return this.http.post<Personaje>(this.apiUrl, personaje);
  }

  deletePersonaje(id: number): Observable<void> {
    if (!this.http) {
      return of(void 0);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
