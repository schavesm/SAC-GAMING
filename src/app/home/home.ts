import { Component, inject, signal } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { Card } from '../card/card';
import { PokemonService } from '../services/pokemonService';
import type { Pokemon } from '../services/pokemon';

@Component({
  imports: [Carousel, Card],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private readonly pokemonService = inject(PokemonService);

  protected readonly pokemons = signal<Pokemon[]>([]);
  protected readonly loadingPokemons = signal(true);
  protected readonly pokemonError = signal(false);

  constructor() {
    this.pokemonService.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
        this.loadingPokemons.set(false);
      },
      error: () => {
        this.pokemonError.set(true);
        this.loadingPokemons.set(false);
      },
    });
  }
}
