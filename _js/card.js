import CardStackController from './Cards/CardStackController';
import CardDirective from './Cards/CardDirective';

var app = angular.module('CardStackApp', []);
app.directive('card', () => new CardDirective());
app.controller('CardStackController', [CardStackController]);
