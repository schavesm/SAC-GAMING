import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { PokemonService } from '../services/pokemonService';
import type { PokemonDetail } from '../services/pokemon';

@Component({
  imports: [RouterLink],
  selector: 'app-card-detail',
  styleUrl: './card-detail.scss',
  templateUrl: './card-detail.html',
})
export class CardDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  protected readonly pokemon = signal<PokemonDetail | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  constructor() {
    this.route.paramMap
      .pipe(
        tap(() => {
          this.pokemon.set(null);
          this.loading.set(true);
          this.error.set(false);
        }),
        switchMap((params) => {
          const id = Number(params.get('id'));
          return Number.isInteger(id) && id > 0
            ? this.pokemonService.getPokemonById(id).pipe(catchError(() => of(null)))
            : of(null);
        }),
      )
      .subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon.set(pokemon);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      });
  }
}
