import $ from 'webpack-zepto'

export class PaneButton {
  constructor(id, icon, active) {
    this.active = false;
    this.opts = {}
    this.opts.id = id + "-button" || "undefined-button";
    this.opts.paneId = id + "-pane" || "undefined-pane";
    this.opts.icon = icon || "none";
    let elem = `<button id="` + this.opts.id + `" class="button-tab button-tab--` + this.opts.icon + `"></button>`;
    $('#button-tabs').append(elem);
    this.elem = document.querySelector('#' + this.opts.id)
    $(document).on('click','#' + this.opts.id, event => {
      event.stopPropagation();
      $(document.body).trigger('togglePane', {id:this.opts.paneId, btnId:this.opts.id})
    })
  }
  toggleActive () {
    this.opts.active = !this.opts.active;
    $("#" + this.opts.id).toggleClass('active')
  }
}
