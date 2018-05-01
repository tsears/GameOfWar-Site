import DemoController from './Demo/DemoController';
import CardDirective from './Cards/CardDirective';

var app = angular.module('DemoApp', []);
app.directive('card', () => new CardDirective());
app.controller('DemoController', ['$timeout', '$interval', DemoController]);
