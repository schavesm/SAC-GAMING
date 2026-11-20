import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', {
      id: 1,
      name: 'bulbasaur',
      image: '/bulbasaur.png',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Pokémon name and image', () => {
    const card = fixture.nativeElement as HTMLElement;
    expect(card.querySelector('img')?.getAttribute('src')).toBe('/bulbasaur.png');
    expect(card.querySelector('.card-title')?.textContent).toContain('bulbasaur');
  });

  it('should link to the Pokémon detail route', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(link?.getAttribute('href')).toBe('/card/1');
  });
});
