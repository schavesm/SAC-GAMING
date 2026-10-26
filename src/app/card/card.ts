import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { Component, Input } from '@angular/core';
import type { Game } from '../services/game';

registerLocaleData(localeEsCo, 'es-CO');

@Component({
  imports: [CurrencyPipe],
  selector: 'app-card',
  styleUrl: './card.scss',
  templateUrl: './card.html',
})
export class Card {
  @Input({ required: true }) game!: Game;
}
