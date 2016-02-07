import {Component, Input} from 'angular2/core';
import {Card} from './card';

@Component({
	selector: 'hand',
	templateUrl: 'template/hand.html'
})
export class Hand {
	@Input() hand;
}