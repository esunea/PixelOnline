import $ from 'webpack-zepto'

export class PaneButton {
  constructor(id, icon, active) {
    this.active = false;
    this.id = id + "-button" || "undefined-button";
    this.paneId = id + "-pane" || "undefined-pane";
    this.icon = icon || "none";
    let elem = `<button id="` + this.id + `" class="button-tab button-tab--` + this.icon + `"></button>`;
    $('#button-tabs').append(elem);
    this.elem = document.querySelector('#' + this.id)
    $(document).on('click','#' + this.id, event => {
      event.stopPropagation();
      $(document.body).trigger('togglePane', {id:this.paneId, btnId:this.id})
    })
  }
  toggleActive () {
    this.active = !this.active;
    $("#" + this.id).toggleClass('active')
  }
}
