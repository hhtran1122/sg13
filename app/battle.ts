import {Card} from './card';

export interface Battle {
	gameId: number;
	playerId: number;
	hand: Card[];
}