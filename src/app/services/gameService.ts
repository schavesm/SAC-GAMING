import { Injectable } from '@angular/core';
import type { Game } from './game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly games: Game[] = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=640&q=80',
      title: 'Aventura sin límites',
      text: 'Explora mundos abiertos, resuelve desafíos y descubre una historia épica.',
      platform: 'PlayStation 5',
      genre: 'Aventura',
      price: 189900,
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=640&q=80',
      title: 'Carrera extrema',
      text: 'Compite a toda velocidad en circuitos llenos de atajos y sorpresas.',
      platform: 'Nintendo Switch',
      genre: 'Carreras',
      price: 219900,
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=640&q=80',
      title: 'Misión táctica',
      text: 'Forma tu escuadrón, domina el campo de batalla y completa cada misión.',
      platform: 'Xbox Series X',
      genre: 'Acción',
      price: 159900,
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=640&q=80',
      title: 'Reinos fantásticos',
      text: 'Adéntrate en una aventura de rol con criaturas, magia y grandes decisiones.',
      platform: 'PC',
      genre: 'RPG',
      price: 139900,
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=80',
      title: 'Arena de campeones',
      text: 'Enfréntate a otros jugadores y demuestra tu estrategia en línea.',
      platform: 'PC',
      genre: 'Multijugador',
      price: 99900,
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=640&q=80',
      title: 'Supervivencia galáctica',
      text: 'Explora planetas desconocidos y sobrevive en los confines del universo.',
      platform: 'PlayStation 5',
      genre: 'Ciencia ficción',
      price: 179900,
    },
  ];

  getGames(): Game[] {
    return this.games;
  }

  getGameById(id: number): Game | undefined {
    return this.games.find((game) => game.id === id);
  }

}
