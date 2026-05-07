import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarioApiService } from './mario-api.service';
import { MarioService, Personaje } from './mario.service';
import { MarioDexPageComponent } from '../features/mario/mario-dex-page/mario-dex-page';

describe('Mario Integration Tests', () => {
  let httpMock: HttpTestingController;
  let apiService: MarioApiService;
  let marioService: MarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MarioDexPageComponent]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(MarioApiService);
    marioService = TestBed.inject(MarioService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Tipo de test: Integracion (mock). Comprueba que el servicio recibe datos del endpoint simulado.(el servicio recibe datos correctamente)
  it('debe obtener personajes desde API con HttpTestingController', () => {
    const respuestaMock: Personaje[] = [
      { id: 10, nombre: 'Yoshi', tipo: 'Aliado', nivelPoder: 85 }
    ];

    apiService.getPersonajes().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].nombre).toBe('Yoshi');
    });

    const req = httpMock.expectOne('/api/personajes');
    expect(req.request.method).toBe('GET');
    req.flush(respuestaMock);
  });

  // Tipo de test: Integracion (mock). Comprueba que el componente se actualiza con los datos HTTP.( los componentes reaccionan a los datos recibidos)
  it('debe actualizar el componente al recibir datos HTTP', fakeAsync(() => {
    const fixture = TestBed.createComponent(MarioDexPageComponent);
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/personajes');
    req.flush([
      { id: 11, nombre: 'Donkey Kong', tipo: 'Aliado', nivelPoder: 95 }
    ]);

    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.personajes.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Donkey Kong');
  }));
});
