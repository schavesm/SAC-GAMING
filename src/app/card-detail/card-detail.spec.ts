import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CardDetail } from './card-detail';

describe('CardDetail', () => {
  let fixture: ComponentFixture<CardDetail>;
  let httpTestingController: HttpTestingController;
  const routeParams = new BehaviorSubject(convertToParamMap({ id: '1' }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: routeParams.asObservable() },
        },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CardDetail);
    httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon/1').flush({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      sprites: {
        other: { 'official-artwork': { front_default: '/bulbasaur.png' } },
      },
    });
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should display the detail loaded for the dynamic route id', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('bulbasaur');
    expect(page.textContent).toContain('grass, poison');
    expect(page.textContent).toContain('0.7 m');
    expect(page.textContent).toContain('6.9 kg');
  });

  it('should request the new Pokémon when the dynamic route id changes', () => {
    routeParams.next(convertToParamMap({ id: '2' }));
    httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon/2').flush({
      id: 2,
      name: 'ivysaur',
      height: 10,
      weight: 130,
      types: [{ type: { name: 'grass' } }],
      sprites: {
        other: { 'official-artwork': { front_default: '/ivysaur.png' } },
      },
    });

    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('ivysaur');
  });
});
