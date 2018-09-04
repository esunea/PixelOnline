import interact from "interactjs";

export class Pane {
  constructor () { }
  create (width, height, id, title) {
    this.width = width || 300;
    this.height = height || 300;
    this.id = id || Math.floor(Math.random() * 10000);
    this.title = title || id || "Hello World!";
    let elem = `<div id="` + this.id + `" class="window" style="
        width:` + this.width + `px;
        height:` + this.height + `px;
        ">
      <div class="window--content"></div>
      <div class="window--snap">` + this.title + `</div>
    </div>`;
    document.body.innerHTML += elem;
    this.elem = document.querySelector('#' + id)
  }
  setZIndex (z) {
    this.elem.style.zIndex = z;
  }
  setCentered () {
    this.elem.style.top = (window.innerHeight - this.height) / 2 + "px";
    this.elem.style.left = (window.innerWidth - this.width) / 2 + "px";
  }
  setInteractable () {
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
      },
      onstart: event => {
        event.target.style.zIndex = ++z;
      }
    });
    interact(".window").on('down', function (event) { event.target.style.zIndex = ++z; });
  }
}
