import EndlessSimulationController from './Simulation/EndlessSimulationController';
import StandardSimulationController from './Simulation/StandardSimulationController';

var app = angular.module('SimulationApp', ['chart.js']);

app.controller('EndlessSimulationController', ['$interval', EndlessSimulationController]);
app.controller('StandardSimulationController', ['$interval', StandardSimulationController]);
