export default class IntegrationController {
  constructor() {
    this.orderedDeck = this._emptyDeck(new War.Deck(4,4));
    var x = new War.Deck(4,4);
    x.shuffle();
    this.shuffledDeck = this._emptyDeck(x);

    var normalDeck = new War.Deck(4, 13);
    normalDeck.shuffle();
    var game = new War.Game(normalDeck, 4);

    this.results = [];
    this.results.push(game.playRound());
    this.results.push(game.playRound());
    this.results.push(game.playRound());
    this.results.push(game.playRound());

    // A war...
    this.sampleWarResult = this._startWar(function(o) { return !o.war });
    this.sampleDoubleWarResult = this._startWar(function(o) { return !o.draws.some(d => d.length > 3)})
    this.sampleThreeWayWarResult = this._startWar(function(o) { return o.draws.filter(d => d.length > 1).length < 3; })
  }

  _emptyDeck(deck) {
    var out = [];

    for (var i = 0; i < deck.initialSize; i++) {
      out.push(deck.deal());
    }

    return out;
  }

  _startWar(filter) {
    var deck = new War.Deck(4, 13);
    deck.shuffle();
    var game = new War.Game(deck, 4);

    while (true) {
      var outcome = game.playRound();
      if (filter(outcome)) {
        deck = new War.Deck(4, 13);
        deck.shuffle();
        game = new War.Game(deck, 4);
      } else {
        return outcome;
      }
    }
  }
}
