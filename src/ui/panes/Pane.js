import interact from "interactjs";
import $ from 'webpack-zepto'

export class Pane {
  constructor (options) {
    this.opts = {
      id: "undefined-pane",
      width: 300,
      height: 300,
      title: "Undefined",
      controls: true,
      active:true,
      resizable:false,
      draggable:true,
      centered:true
    }
    $.extend(this.opts, options)
    let elem = `<div id="` + this.opts.id + `" class="window" style="
        width:` + this.opts.width + `px;
        height:` + this.opts.height + `px;
        ">
      <div class="window--content"></div>
      <div class="window--snap noselect">
        <span class="title">` + this.opts.title + `</span>`
        + ((!this.opts.controls) ? `` : `<div class="controls"><button class="close" id="` + this.opts.id + `--close"></button></div>`) +
        `</div>
    </div>`;
    document.body.innerHTML += elem;
    this.elem = document.querySelector('#' + this.opts.id)
    if (this.opts.centered) this.setCentered();
    if (!this.opts.active) this.toggleActive();
    if (this.opts.draggable) this.setInteractable(this.opts.resizable);
    if (this.opts.controls) {
      $(document).on('click','#' + this.opts.id + '--close', event => {
        event.stopPropagation();
        this.close();
      })
    }
  }
  setZIndex (z) {
    this.elem.style.zIndex = z;
  }
  setCentered () {
    this.elem.style.top = (window.innerHeight - this.opts.height) / 2 + "px";
    this.elem.style.left = (window.innerWidth - this.opts.width) / 2 + "px";
  }
  toggleActive () {
    this.opts.active = !this.opts.active;
    $("#" + this.opts.id).toggle()
  }
  close () {
    $(document.body).trigger('closePane', {id:this.opts.id})
  }
  setInteractable (resizable) {
    let z = 1000;
    this.elem.classList.add('draggable')
    interact(".draggable").draggable({
      allowFrom: '.window--snap',
      onmove: event => {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    });
    interact(".window").on('down', function (event) {
      $(event.target).closest('.window').css('z-index', ++z);
    });
  }
  destroy () {
    $('#' + this.opts.id).remove()
  }
}
