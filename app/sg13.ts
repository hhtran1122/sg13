import {Component} from 'angular2/core';
import {Card} from './card.ts';

@Component({
  selector: 'sg13',
  template: `
    <h2>Todo</h2>
    <span> of {{cards.length}} remaining</span>
    <ul>
      <li *ngFor="#card of cards">
        <span>{{card.num}} and {{card.suit}} total {{card.title}}</span>
      </li>
    </ul>
    [ <a (click)="archive()">archive</a> ]
    `
})
export class sg13 {
  cards: Card[] = [
      {id:1, num:"3", suit: "C"},
      {id:2, num:"3", suit: "D" }
  ];
  get remaining() {
    return this.cards.reduce((count: number, card: Card) =>);
  }
}
