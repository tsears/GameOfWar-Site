import SimulationController from './Simulation/SimulationController';

var app = angular.module('SimulationApp', ['chart.js']);

app.controller('SimulationController', ['$interval', SimulationController]);
