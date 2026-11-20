import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';
import type { Pokemon, PokemonDetail } from './pokemon';

interface PokemonApiResponse {
  results: { name: string; url: string }[];
}

interface PokemonDetailApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .pipe(
        map(({ results }) =>
          results.map(({ name, url }) => {
            const id = Number(url.split('/').filter(Boolean).pop());
            return {
              id,
              name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }),
        ),
      );
  }

  getPokemonById(id: number): Observable<PokemonDetail> {
    return this.http
      .get<PokemonDetailApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites.other['official-artwork'].front_default ??
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          height: pokemon.height,
          weight: pokemon.weight,
          types: pokemon.types.map(({ type }) => type.name),
        })),
      );
  }
}
