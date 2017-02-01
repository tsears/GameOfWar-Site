export default class Result {
  constructor() {
    this.restrict = 'E';
    this.replace = 'true';
    this.controller = [ () => {} ];
    this.controllerAs = "rvm";
    this.scope = {};
    this.templateUrl = "/assets/ng-partials/result.html";
    this.bindToController = {
      result: '<'
    };
  }
}
