export default class CardDirective {
  constructor() {
    this.restrict = 'E';
    this.scope = {};
    this.replace = true;
    this.template = `<div class="card {{cvm.rank}} {{cvm.suit}}"><div></div><div></div><div></div><div></div><div></div></div>`;
    this.controllerAs = "cvm";
    this.bindToController =  {
        suit: '@',
        rank: '@'
    };
    this.controller = [() => {}];
  }
}
