var app = angular.module('IntegrationApp', []);

app.directive('result', function() {
  return {
		restrict: 'E',
		replace: 'true',
    controller: [ function() {} ],
    controllerAs: "rvm",
    scope: {},
    templateUrl: "/assets/ng-partials/result.html",
    bindToController: {
      result: '<'
    },
	};
})

app.controller('IntegrationController', [function() {
  var emptyDeck = function(deck) {
    var out = [];

    for (var i = 0; i < deck.initialSize; i++) {
      out.push(deck.deal());
    }

    return out;
  }

  this.orderedDeck = emptyDeck(new War.Deck(4,4));

  // todo - decks should be immutable...
  var x = new War.Deck(4,4);
  x.shuffle();
  this.shuffledDeck = emptyDeck(x);

  var normalDeck = new War.Deck(4, 13);
  normalDeck.shuffle();
  var game = new War.Game(normalDeck, 4);

  this.results = [];
  this.results.push(game.playRound());
  this.results.push(game.playRound());
  this.results.push(game.playRound());
  this.results.push(game.playRound());

  var startWar = function(filter) {
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

  // A war...
  this.sampleWarResult = startWar(function(o) { return !o.war });
  this.sampleDoubleWarResult = startWar(function(o) { return !o.draws.some(d => d.length === 3)})
  this.sampleThreeWayWarResult = startWar(function(o) { return o.draws.filter(d => d.length > 1).length < 3; })
}]);
