import {Component, Input} from 'angular2/core';
import {Card} from './card';

@Component({
	selector: 'hand',
	templateUrl: 'template/hand.html',
	styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }`]
})
export class Hand {
	@Input() hand: Card[];
	//selectedCard: Card[];

	onSelect(card: Card) {
		card.selected = !card.selected;
	}
	
}