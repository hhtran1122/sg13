import {Component} from 'angular2/core';
import {Card} from './card';
import {Player} from './player';
import {Hand} from './hand';
import {Battle} from './battle';

@Component({
  selector: 'sg13',
  templateUrl: 'template/sg13.html',
  directives: [Hand]
})
export class sg13 implements OnInit {
  private _gameId: number = 0;
  private _maxPlayer: number = 4;
  private _maxHand: number;
  private _maxDeck: number;
  private _currentPlayer: number = 0;
  private _winner: number = 99;
  CardNumber: string[] = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
  CardSuit: string[] = ["C", "D", "S", "H"];
  Deck: Card[] = [];
  Battles: Battle[] = [];
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
        this.Deck.push({ rank: z, num: x, suit: y, selected: false, played: false;});
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
    this._currentPlayer = this.whoGoesFirst();
    while (this._currentPlayer != 0) {
      this.computer(this.Players[this._currentPlayer]);
      if (this._currentPlayer == 3) {
      console.log("a";)
      this._currentPlayer = 0;
      }
      else { this._currentPlayer++ }
    }
  }

  reset() {
    if (this._gameId != 0) {
      this.Players.forEach(player => {
        this.Deck = this.Deck.concat(player.hand.splice(0, this._maxHand));
      });
    }
  }

  fisherYates (array: Card[]) {
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
    this.Players.forEach(player => {
      this.sortCard(player);
    })
  }

  transferCard(player: Player) {
    var card: Card = this.Deck.shift();
    player.hand.push(card);
  }

  sortCard(player: Player) {
    player.hand.sort(function(a, b) {
      return a.rank - b.rank;
    });
  }

  submit(player: Player) {
    var temp;
    temp = player.hand.filter(x => {
      return x.selected;
    })
    if (temp.length != 0) {
      this.sendToBattle(temp);
    }
  }

  whoGoesFirst() {
    var test;
    this.Players.forEach(player => {
      if (player.hand.some(card => {
        return card.rank == 1;
      }) == true) { 
        test = player.id 
      }
    })
    return test - 1;
  }

  computer(player: Player) {   
    var temp;
    player.hand[0].selected = true;
    temp = player.hand.filter(x => {
      return x.selected;
    })
    if (temp.length != 0) {
        this.sendToBattle(temp);
    }
  }

  sendToBattle(cards: Card[]) {
    this.Battles.push({ gameId: this._gameId, playerId: this._currentPlayer, hand: cards });
    cards.forEach(x => { x.played = true;} )
  }
}