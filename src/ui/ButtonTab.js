import $ from 'webpack-zepto'

export class ButtonTab {
  constructor(id, icon, active) {
    this.active = false;
    this.id = id + "-button" || Math.floor(Math.random() * 10000) + "-button";
    this.icon = icon || "none";
    let elem = `<button id="` + this.id + `" class="button-tab button-tab--` + this.icon + `"></button>`;
    $('#button-tabs').append(elem);
    this.elem = document.querySelector('#' + this.id)
  }
  toggleActive () {
    this.active = !this.active;
    $("#" + this.id).toggleClass('active')
  }
}
