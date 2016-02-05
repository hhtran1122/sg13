import {Component} from 'angular2/core';
import {Card} from './card';
import {Player} from './player';

@Component({
  selector: 'sg13',
  template: `
    <h2>SG13 <input type="number" value="{{_maxPlayer}}"></h2>
    
    <div *ngFor="#player of Players">
      Player: {{player.id}} has {{player.hand.length}} Cards in hand
    </div>
    [ <a (click)="newGame()">New Game</a> ]
    [ <a (click)="reset()">Reset</a> ]
    <ul>
      <li *ngFor="#card of Players[0].hand" >
        {{card.num}}{{card.suit}} with {{card.player}}
      </li>
    </ul>
    `
})
export class sg13 implements OnInit {
  _maxPlayer: number = 4;
  _maxHand: number = 13;
  CardNum: string[] = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
  CardSuit: string[] = ["C", "D", "S"];
  // CardSuit: string[] = ["C", "D", "S", "H"];
  Cards: Card[] = [];
  Players: Player[] = [
    { id: 1, hand: []},
    { id: 2, hand: []},
    { id: 3, hand: []},
    { id: 4, hand: []}
  ];
  
  ngOnInit() {
    var z = 1;
    this.CardNum.forEach(x => {
      this.CardSuit.forEach(y => {
        this.Cards.push({ id: z, num: x, suit: y, player: 0 });
        z++;
      });
    });
  }
  newGame() {
    this.reset();
    console.log("a");
    this.suffle();
    // this.Players.forEach(player => {
    //   player.hand = this._maxHand;
    // });
  }
  reset() {
    this.Cards.forEach(c => {
      c.player = 0;
    });
    this.Players.forEach(p => {
      p.hand = [];
    })
    
  }
  suffle() {
    this.Cards.forEach(card  => {
      var t_player: number;
      t_player = Math.floor((Math.random() * this._maxPlayer) + 1);
      while (this.Cards.filter((f) => f.player == t_player).length >= this._maxHand) {
        t_player = this.nextPlayer(t_player);
      }
      card.player = t_player;
      console.log("b");
      this.Players[t_player-1].hand.push({ id: card.id, num: card.num, suit: card.suit, player: t_player });
      console.log(this.Players[t_player - 1].hand.length);
    });
  }
  nextPlayer(t) {
    if (this.Players[t - 1].hand.length < this._maxHand) {
      if (t == 4) t = 0;
      t++;
    }
    return t;
  }
}
