import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    httpTestingController
      .expectOne('https://pokeapi.co/api/v2/pokemon?limit=10')
      .flush({
        results: Array.from({ length: 10 }, (_, index) => ({
          name: `pokemon-${index + 1}`,
          url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
        })),
      });
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ten Pokémon from the API', () => {
    const pokemonCards = fixture.nativeElement.querySelectorAll('.pokemon-card');
    expect(pokemonCards.length).toBe(10);
  });
});
