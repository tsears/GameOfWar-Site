export default class StandardSimulationController {
  constructor($interval) {
    this._interval = $interval;
    this.data = [0,0,0,0];
    this.roundData = [
      [
        {x: 0,    y: 0},
        {x: 250,  y: 0},
        {x: 500,  y: 0},
        {x: 750,  y: 0},
        {x: 1000, y: 0},

        {x: 1250, y: 0},
        {x: 1500, y: 0},
        {x: 1750, y: 0},
        {x: 2000, y: 0},
        {x: 2250, y: 0},
        {x: 2500, y: 0},
        {x: 2750, y: 0},
        {x: 3000, y: 0},
        {x: 3250, y: 0},
        {x: 3500, y: 0},
        {x: 3750, y: 0},
        {x: 4000, y: 0},
        {x: 4250, y: 0},
        {x: 4500, y: 0},
        {x: 4750, y: 0},
        {x: 5000, y: 0}
      ],
      [
        {x: 0,    y: 0},
        {x: 250,  y: 0},
        {x: 500,  y: 0},
        {x: 750,  y: 0},
        {x: 1000, y: 0},

        {x: 1250, y: 0},
        {x: 1500, y: 0},
        {x: 1750, y: 0},
        {x: 2000, y: 0},
        {x: 2250, y: 0},
        {x: 2500, y: 0},
        {x: 2750, y: 0},
        {x: 3000, y: 0},
        {x: 3250, y: 0},
        {x: 3500, y: 0},
        {x: 3750, y: 0},
        {x: 4000, y: 0},
        {x: 4250, y: 0},
        {x: 4500, y: 0},
        {x: 4750, y: 0},
        {x: 5000, y: 0}
      ]
    ];

    this.roundDataLabels = [
      { label: '0-250'     },
      { label: '250-500'   },
      { label: '500-750'   },
      { label: '750-1000'  },

      { label: '1000-1250' },
      { label: '1250-1500' },
      { label: '1500-1750' },
      { label: '1750-2000' },

      { label: '2000-2250' },
      { label: '2250-2500' },
      { label: '2500-2750' },
      { label: '2750-3000' },

      { label: '3000-3250' },
      { label: '3250-3500' },
      { label: '3500-3750' },
      { label: '3750-4000' },

      { label: '4000-4250' },
      { label: '4250-4500' },
      { label: '4500-4750' },
      { label: '4750-5000' },
    ]

    this.roundDataSetOptions = [

    ]

    this.labels = [
      'Player 1',
      'Player 2',
      'Player 3',
      'Player 4',
    ];
    this.gameslayed = 0;
    this.maxGames = 500;
    this.interval = null;
    this.progress = 0;
    this.simRunning = false;
    this.gamesTerminated = 0;
    this.shuffleWonCards = true;

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
            maxTicksLimit: 10,
            min: 0,
          },
        }]
      },
    };

    this.roundCountChartOptions = {
      //showLines: false,
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 10,
            callback: (v, i, values) => {
              const labelIndex = i === 0 ? 0 : ((i - 1) * 2) + 1;
              return this.roundDataLabels[labelIndex].label;
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of Rounds Per Game (Buckets of 250)',
            fontSize: 16
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 10,
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: "Number of Occurrences",
            fontSize: 16
          }
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
    this.gamesPlayed = 0
    this.data = [0,0,0,0];
    this.simRunning = true;
    this.gamesTerminated = 0;

    const cardAwardMethod = this.shuffleWonCards ? War.CardAwardMethod.Shuffled : War.CardAwardMethod.Increasing;
    const roundDataIndex = this.shuffleWonCards ? 1 : 0;

    this.interval = this._interval(() => {
      const deck = new War.Deck(4,13);
      const warGame = new War.Game(deck, 4, cardAwardMethod);

      let result;
      let roundCount = 0;
      do {
        result = warGame.playRound();
        if (++roundCount === 5000) { ++this.gamesTerminated; break; }
      } while (!result.gameOver);

      ++this.gamesPlayed;

      if(roundCount !== 5000) {
        for(let i = 1; i < this.roundData[0].length; ++i) {
          let e = this.roundData[roundDataIndex][i];
          let p = this.roundData[roundDataIndex][i - 1]

          console.log(roundCount);
          if (roundCount < e.x) {
            ++p.y;
            break;
          }
        }
      }

      this.progress = (this.gamesPlayed / this.maxGames) * 100;

      if (result.winner) {
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
      } else {
        ++this.gamesTerminated;
      }

      if (this.gamesPlayed === this.maxGames) {
        this.stopSimulation();
      }
    }, 10);
  }
}
