export default class CardStackController {
  constructor() {
    const deck = new War.Deck(4, 13);
    this.cards = [];
    let card;
    while(card = deck.deal()) {
      this.cards.push(card);
    }
    this.cards.reverse();
  }

  getSuitName(suitNum) {
    switch (suitNum) {
      case 1:
        return 'clubs';
      case 2:
        return 'diamonds';
      case 3:
        return 'spades';
      case 4:
        return 'hearts';
      default:
        throw new Error(`No mapping for suit ${suitNum}`);
    }
  }

  getCardName(rankNum) {
    switch(rankNum) {
      case 1:
        return 'ace';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      case 6:
        return 'six';
      case 7:
        return 'seven';
      case 8:
        return 'eight';
      case 9:
        return 'nine';
      case 10:
        return 'ten';
      case 11:
        return 'jack';
      case 12:
        return 'queen';
      case 13:
        return 'king';
      default:
        throw new Error(`No mapping for card with rank ${rankNum}`);
    }
  }
}
