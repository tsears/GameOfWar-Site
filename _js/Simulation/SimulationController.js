export default class SimulationController {
  constructor($interval) {
    this._interval = $interval;
    this.data = [0,0,0,0];
    this.labels = [
      'Player 1',
      'Player 2',
      'Player 3',
      'Player 4',
    ];
    this.roundsPlayed = 0;
    this.maxRounds = 1000;
    this.interval = null;
    this.progress = 0;
    this.simRunning = false;

    this.chartOptions = {
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            //fixedStepSize: 5,
            maxTicksLimit: 10,
            min: 0,
          },
          // gridLines: {
          //   display: false
          // }
        }]
      },
    };
  }

  stopSimulation() {
    this._interval.cancel(this.interval);
    this.interval = undefined;
    this.simRunning = false;
  }

  runSimulation() {
    const deck = new War.Deck(4,13);
    const warGame = new War.EndlessGame(deck, 4);
    this.roundsPlayed = 0
    this.data = [0,0,0,0];
    this.simRunning = true;

    this.interval = this._interval(() => {
      const result = warGame.playRound();
      this.progress = (this.roundsPlayed / this.maxRounds) * 100;

      switch(result.winner.name) {
        case 'Player 1':
          ++this.data[0];
          break;
        case 'Player 2':
          ++this.data[1];
          break;
        case 'Player 3':
          ++this.data[2];
          break;
        case 'Player 4':
          ++this.data[3];
          break;
      }
      ++this.roundsPlayed;
      if (this.roundsPlayed === this.maxRounds) {
        this.stopSimulation();
      }
    }, 10);
  }
}
