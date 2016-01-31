import {Component} from 'angular2/core';
import {Card} from './card';
import {Player} from './player';

@Component({
  selector: 'sg13',
  template: `
    <h2>SG13 <input type="number" value="{{_maxPlayer}}"></h2>
    <span> of {{Cards.length}} remaining</span>
    <ul>
      <li *ngFor="#card of Cards">
        <span>{{card.num}} and {{card.suit}} playered to {{card.player}}</span>
      </li>
    </ul>
    [ <a (click)="newGame()">New Game</a> ]
    `
})
export class sg13 {
  Players: Player[] = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4}
  ];
  _maxPlayer: number = 4;
  Cards: Card[] = [
    { id: 1, num: "3", suit: "C", player: { id: 1 } },
    { id: 2, num: "3", suit: "D", player: { id: 1 } },
    { id: 3, num: "3", suit: "S", player: { id: 1 } },
    { id: 4, num: "3", suit: "H", player: { id: 1 } },
    { id: 5, num: "4", suit: "C", player: { id: 1 } },
    { id: 6, num: "4", suit: "D", player: { id: 1 } },
    { id: 7, num: "4", suit: "S", player: { id: 1 } },
    { id: 8, num: "4", suit: "H", player: { id: 1 } },
    { id: 9, num: "5", suit: "C", player: { id: 1 } },
    { id: 10, num: "5", suit: "D", player: { id: 1 } },
    { id: 11, num: "5", suit: "S", player: { id: 1 } },
    { id: 12, num: "5", suit: "H", player: { id: 1 } },
  ];
  newGame() {
    this.Cards.forEach(card  => {
      var t_player = Math.floor((Math.random() * this._maxPlayer) + 1);
      card.player = {id: t_player };
    });
  }
}
