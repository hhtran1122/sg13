export class card {
  id : number;
  public num : string;
  public suit : string;
  public title : string;
  constructor (public id, public num, public suit, public title) {
    this.id = id;
    this.num = num;
    this.suit = suit;
    this.title = this.num & this.suit;
  }
}
