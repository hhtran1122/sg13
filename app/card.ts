import {Player} from "./player"

export interface Card {
  id: number;
  player: Player;
  num: string;
  suit: string;
}