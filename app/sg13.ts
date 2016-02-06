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
        {{card.num}}{{card.suit}}
      </li>
    </ul>
    `
})
export class sg13 implements OnInit {
  _maxPlayer: number = 4;
  _maxHand: number = 13;
  _maxDeck: number = this._maxPlayer * this._maxHand;
  _gameNum: number = 0;
  CardNum: string[] = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
  CardSuit: string[] = ["C", "D", "S", "H"];
  Deck: Card[] = [];
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
        this.Deck.push({ id: z, num: x, suit: y});
        z++;
      });
    });
  }
  newGame() {
    this.reset();
    this.shuffle();
    this._gameNum++;
  }
  reset() {
    if (this._gameNum != 0) {
      console.log("a");
      this.Players.forEach(p => {
        this.Deck = this.Deck.concat(p.hand.splice(0, this._maxHand));
      });
    }
  }
  fisherYates (array) {
    var cIndex = array.length, t_Card, rIndex;
    while (0 !== cIndex) {
      rIndex = Math.floor(Math.random() * cIndex);
      cIndex -= 1;
      t_Card = array[cIndex];
      array[cIndex] = array[rIndex];
      array[rIndex] = t_Card;
    }
    return array;
  }
  shuffle() {
    var suffledDeck = this.fisherYates(this.Deck);
    this.Deck = [];
    this.Deck = suffledDeck;
    while (this.Deck.length != 0) {
      for (i = 0; i < this.Players.length; i++ ) {
        this.transferCard(this.Players[i]);
      });
    }
    // ---- Try to use a while loop to shuffle
    // var modifier;
    // firstHalf ? modifier = this._maxDeck / 2 : modifier = 0;
    // while (this.Deck.length !=  modifier) {
    //   var t_player: number;
    //   t_player = Math.floor((Math.random() * this._maxPlayer) + 1);
    //   while (this.Players[t_player - 1].hand.length >= this._maxHand) {
    //     t_player = this.nextPlayer(t_player);
    //   }
    //   console.log("b");
    //   // card.player = t_player;
    //   // var c: Card = this.Deck.shift();
    //   this.transferCard(this.Players[t_player - 1]);a
    // }
    // if (firstHalf) window.setTimeout(this.shuffle(false), 2000);
    //
    // 
    // ----- Try to assign a iternate thru deck
    // this.Deck.forEach(card  => {
    //   var t_player: number;
    //   t_player = Math.floor((Math.random() * this._maxPlayer) + 1);
    //   while (this.Deck.filter((f) => f.player == t_player).length >= this._maxHand) {
    //     t_player = this.nextPlayer(t_player);
    //   }
    //   card.player = t_player;
    //   console.log("b");
    //   this.transferCard(card, this.Players[t_player - 1]);
    //   // this.Players[t_player-1].hand.push({ id: card.id, num: card.num, suit: card.suit, player: t_player });
    //   console.log(this.Players[t_player - 1].hand.length);
    // });
  }
  nextPlayer(t) {
    if (this.Players[t - 1].hand.length < this._maxHand) {
      if (t == 4) t = 0;
      t++;
    }
    return t;
  }
  transferCard(player: Player) {
    var c: Card = this.Deck.shift();
    player.hand.push(c);
  }
}
