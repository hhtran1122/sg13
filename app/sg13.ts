import {Component} from 'angular2/core';
import {Card} from './card';
import {Player} from './player';
import {Hand} from './hand';

@Component({
  selector: 'sg13',
  templateUrl: 'template/sg13.html',
  directives: [Hand]
})
export class sg13 implements OnInit {
  _gameId: number = 0;
  _maxPlayer: number = 4;
  _maxHand: number;
  _maxDeck: number;
  CardNumber: string[] = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
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
    this.CardNumber.forEach(x => {
      this.CardSuit.forEach(y => {
        this.Deck.push({ rank: z, num: x, suit: y});
        z++;
      });
    });
    this._maxDeck = z - 1;
    this._maxHand = this._maxDeck / this._maxPlayer;
  }

  newGame() {
    this.reset();
    this.shuffle();
    this._gameId++;
  }

  reset() {
    if (this._gameId != 0) {
      this.Players.forEach(player => {
        this.Deck = this.Deck.concat(player.hand.splice(0, this._maxHand));
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
      for (var i = 0; i < this.Players.length; i++) {
        this.transferCard(this.Players[i]);
      }
    }
  }

  transferCard(player: Player) {
    var card: Card = this.Deck.shift();
    player.hand.push(card);
  }
}