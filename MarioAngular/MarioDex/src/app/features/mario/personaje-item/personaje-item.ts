import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personaje } from '../../../core/mario.service';

@Component({
  selector: 'app-personaje-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personaje-item.html',
  styleUrls: ['./personaje-item.css']
})
export class PersonajeItemComponent {
  @Input() personaje!: Personaje;
  @Output() eliminar = new EventEmitter<void>();
}
