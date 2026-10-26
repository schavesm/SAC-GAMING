import { Component, inject } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { Card } from '../card/card';
import { GameService } from '../services/gameService';

@Component({
  imports: [Carousel, Card],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private readonly gameService = inject(GameService);

  protected readonly games = this.gameService.getGames();
}
