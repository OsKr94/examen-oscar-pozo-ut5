import { Component } from '@angular/core';
import { MarioDexPageComponent } from './features/mario/mario-dex-page/mario-dex-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MarioDexPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
