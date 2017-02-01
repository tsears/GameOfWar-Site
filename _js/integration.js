import IntegrationController from './Integration/IntegrationController.js';
import Result from './Result/Result.js';

var app = angular.module('IntegrationApp', []);

app.directive('result', () => new Result());
app.controller('IntegrationController', [IntegrationController]);
