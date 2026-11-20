import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Pokemon } from '../services/pokemon';

@Component({
  imports: [RouterLink],
  selector: 'app-card',
  styleUrl: './card.scss',
  templateUrl: './card.html',
})
export class Card {
  @Input({ required: true }) pokemon!: Pokemon;
}
