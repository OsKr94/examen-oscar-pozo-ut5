import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AppComponent } from '../app.component';
import { MarioService, Personaje } from './mario.service';
import { MarioDexPageComponent } from '../features/mario/mario-dex-page/mario-dex-page';
import { PersonajeItemComponent } from '../features/mario/personaje-item/personaje-item';
import { NuevoPersonajeComponent } from '../features/mario/nuevo-personaje/nuevo-personaje';

describe('Mario Unit Tests', () => {
  describe('MarioService', () => {
    let service: MarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(MarioService);
    });

    // Tipo de test: Unitario. Comprueba la creación del servicio Mario.(creación del servicio)
    it('debe crear el servicio', () => {
      expect(service).toBeTruthy();
    });

    // Tipo de test: Unitario. Comprueba la obtención de la lista inicial de personajes.(obtencion de lista)
    it('debe devolver la lista inicial de personajes', async () => {
      const lista = await firstValueFrom(service.personajes$);
      expect(lista.length).toBe(3);
      expect(lista[0].nombre).toBe('Mario');
    });

    // Tipo de test: Unitario. Comprueba que se añade correctamente un personaje válido.(crear personaje)
    it('debe añadir un personaje válido', async () => {
      const nuevo: Personaje = { nombre: 'Bowser', tipo: 'Jefe', nivelPoder: 120 };

      const resultado = service.addPersonaje(nuevo);
      expect(resultado).toBeTrue();

      const lista = await firstValueFrom(service.personajes$);
      const creado = lista.find((p) => p.nombre === 'Bowser');
      expect(creado).toBeTruthy();
      expect(lista.length).toBe(4);
    });

    // Tipo de test: Unitario. Comprueba que se elimina correctamente un personaje existente.(eliminar personaje)
    it('debe eliminar un personaje existente', async () => {
      const inicial = await firstValueFrom(service.personajes$);
      const objetivo = inicial[0];
      service.eliminarPersonaje(objetivo);

      const final = await firstValueFrom(service.personajes$);
      expect(final.some((p) => p.id === objetivo.id)).toBeFalse();
    });

    // Tipo de test: Unitario. Comprueba el comportamiento ante datos vacíos o inválidos.(comportamiento ante datos incorrectos o vacios)
    it('no debe añadir personajes con datos vacíos o inválidos', async () => {
      const tamanyoInicial = 3;
      const invalido: Personaje = { nombre: '  ', tipo: '', nivelPoder: 0 };

      const resultado = service.addPersonaje(invalido);
      expect(resultado).toBeFalse();

      const lista = await firstValueFrom(service.personajes$);
      expect(lista.length).toBe(tamanyoInicial);
    });
  });

  describe('AppComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
      }).compileComponents();
    });

    // Tipo de test: Unitario. Comprueba creación del componente raíz de la app MarioDex.
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    // Tipo de test: Unitario. Comprueba que renderiza el título principal de MarioDex.
    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('MarioDex');
    });
  });

  describe('MarioDexPageComponent', () => {
    let component: MarioDexPageComponent;
    let fixture: ComponentFixture<MarioDexPageComponent>;
    let service: MarioService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MarioDexPageComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(MarioDexPageComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(MarioService);
      fixture.detectChanges();
    });

    // Tipo de test: Unitario. Comprueba la creación del componente principal.
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Tipo de test: Unitario. Comprueba que el componente recibe la lista de personajes del servicio.
    it('debe cargar la lista de personajes desde MarioService', () => {
      expect(component.personajes.length).toBeGreaterThan(0);
      expect(component.personajes[0].nombre).toBe('Mario');
    });

    // Tipo de test: Unitario. Comprueba apertura y cierre del modal de alta.
    it('debe abrir y cerrar el modal', () => {
      component.abrirModal();
      expect(component.mostrarModal).toBeTrue();

      component.cerrarModal();
      expect(component.mostrarModal).toBeFalse();
    });

    // Tipo de test: Unitario (mock). Comprueba que elimina un personaje invocando al servicio simulado con spy.
    it('debe eliminar un personaje usando el servicio', () => {
      const personaje: Personaje = component.personajes[0];
      const spy = spyOn(service, 'eliminarPersonaje').and.callThrough();

      component.eliminarPersonaje(personaje);
      expect(spy).toHaveBeenCalledWith(personaje);
    });
  });

  describe('PersonajeItemComponent', () => {
    let component: PersonajeItemComponent;
    let fixture: ComponentFixture<PersonajeItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PersonajeItemComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(PersonajeItemComponent);
      component = fixture.componentInstance;
    });

    // Tipo de test: Unitario. Comprueba la creación del componente de tarjeta.
    it('should create', () => {
      component.personaje = { id: 1, nombre: 'Mario', tipo: 'Heroe', nivelPoder: 100 };
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    // Tipo de test: Unitario. Comprueba renderizado de datos de un personaje Mario.
    it('debe mostrar los datos del personaje en la vista', () => {
      const personaje: Personaje = {
        id: 99,
        nombre: 'Toad',
        tipo: 'Aliado',
        nivelPoder: 65
      };

      component.personaje = personaje;
      fixture.detectChanges();

      const html = fixture.nativeElement as HTMLElement;
      expect(html.textContent).toContain('Toad');
      expect(html.textContent).toContain('Aliado');
      expect(html.textContent).toContain('65');
    });

    // Tipo de test: Unitario (mock). Comprueba que emite el evento al pulsar eliminar usando spy.
    it('debe emitir evento eliminar al hacer click en el boton', () => {
      component.personaje = { id: 1, nombre: 'Goomba', tipo: 'Enemigo', nivelPoder: 20 };
      spyOn(component.eliminar, 'emit');
      fixture.detectChanges();

      const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      boton.click();

      expect(component.eliminar.emit).toHaveBeenCalled();
    });
  });

  describe('NuevoPersonajeComponent', () => {
    let component: NuevoPersonajeComponent;
    let fixture: ComponentFixture<NuevoPersonajeComponent>;
    let service: MarioService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NuevoPersonajeComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(NuevoPersonajeComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(MarioService);
      fixture.detectChanges();
    });

    // Tipo de test: Unitario. Comprueba la creación del componente de formulario.
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Tipo de test: Unitario (mock). Comprueba alta de personaje válido y cierre del modal.
    it('debe guardar personaje valido y emitir cancelar', () => {
      spyOn(service, 'addPersonaje').and.returnValue(true);
      spyOn(component.cancelar, 'emit');

      component.nuevoPersonaje = {
        nombre: 'Bowser',
        tipo: 'Jefe',
        nivelPoder: 120
      };

      component.guardar();

      expect(service.addPersonaje).toHaveBeenCalled();
      expect(component.cancelar.emit).toHaveBeenCalled();
      expect(component.nuevoPersonaje.nombre).toBe('');
    });

    // Tipo de test: Unitario (mock). Comprueba que no guarda datos vacíos o inválidos.
    it('no debe guardar personaje con datos vacios', () => {
      const spy = spyOn(service, 'addPersonaje');

      component.nuevoPersonaje = {
        nombre: '',
        tipo: '',
        nivelPoder: 0
      };

      component.guardar();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
