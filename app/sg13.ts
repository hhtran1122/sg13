import {Component} from 'angular2/core';
import {Card} from './card';
import {Player} from './player';

@Component({
  selector: 'sg13',
  template: `
    <h2>SG13 <input type="number" value="{{_maxPlayer}}"></h2>
    <span> of {{Cards.length}} remaining</span>
    <span *ngFor="#player of Players">
      Player: {{player.id}} has {{player.hand}} Cards in hand
    </span> <br/>
    <ul>
      <li *ngFor="#card of Cards">
        <span>{{card.num}} and {{card.suit}} playered to {{card.player}}</span>
      </li>
    </ul>
    [ <a (click)="newGame()">New Game</a> ]
    `
})
export class sg13 implements OnInit {
  _maxPlayer: number = 4;
  CardNum: string[] = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
  CardSuit: string[] = ["C", "D", "S", "H"];
  Cards: Card[] = [];
  Players: Player[] = [
    { id: 1, hand: 0},
    { id: 2, hand: 0},
    { id: 3, hand: 0},
    { id: 4, hand: 0}
  ];
  ngOnInit() {
    var z = 1;
    this.CardNum.forEach(x => {
      this.CardSuit.forEach(y => {
        this.Cards.push({ id: z, num: x, suit: y, player: 1 });
        z++;
      });
    });
  }
  newGame() {
    this.Cards.forEach(card  => {
      var t_player = Math.floor((Math.random() * this._maxPlayer) + 1);
      card.player = t_player;
    });
    this.Players.forEach(player => {
        player.hand = this.Cards.filter((f) => f.player == player.id).length;
    });
  }
}
