import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from './mario.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarioApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl?.replace(/\/+$/, '') ?? '';
  private readonly apiUrl = `${this.apiBaseUrl}/api/personajes`;

  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.apiUrl);
  }
}
