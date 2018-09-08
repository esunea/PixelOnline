import {Pane, PaneButton, PaneLogin, PaneRegister, PaneTab} from "../";
import interact from "interactjs";
import $ from 'webpack-zepto'

export class PaneManager {
  constructor () {
    this.panes = [];
    this.buttons = [];
    this.z = 1000;
    $(document).on('closePane', (event, args) => {
      this.remove('panes', args.id);
      console.log("closePane");
    })
    $(document).on('togglePane', (event, args) => {
      this.get('panes', args.id).toggleActive();
      this.get('buttons', args.btnId).toggleActive();
    })
    interact(".window").on('down', (event) => {
      this.setOnTop(event.currentTarget.id)
    });
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
  }
  createLogin() {
    let pane = new PaneLogin();
    this.panes.push(pane)
    $(document).on('openRegister', event => {
      this.get('panes', 'login-pane').toggleActive();
      this.createRegister();
    })
  }
  createExample(id) {
    let pane = new Pane({id:id, title:id});
    this.panes.push(pane)
  }
  createRegister() {
    let pane = new PaneRegister()
    this.panes.push(pane)
    this.reOrder()

    $(document).one('closeRegister', event => {
      this.remove('panes', 'register-pane');
      this.get('panes', 'login-pane').toggleActive();
    })
  }
  createTchat() {
    let button = new PaneButton('tchat', 'tchat')
    let pane = new PaneTab({
      id: "tchat-pane",
      width: 300,
      height: 450,
      title: "Tchat",
      controls: true
    })
    pane.toggleActive();
    this.panes.push(pane)
    this.buttons.push(button)
    this.reOrder()
  }
  setOnTop(paneId) {
    let id = null
    this.panes.forEach((pane, index) => {
      if (pane.opts.id === paneId) id = index
    })
    let pane = this.panes.splice(id, 1)
    this.panes.push(pane[0])
    this.reOrder()
  }
  reOrder() {
    this.panes.forEach((pane, i) => {
      $('#' + pane.opts.id).css('z-index', this.z + i)
    })
  }
  setConnected() {
    this.remove('panes', 'login-pane')
    this.createTchat()
  }
  remove (type, id) {
    this[type].forEach((item, i) => {
      if(item.id === id || item.opts.id === id) {
        item.destroy()
        this.panes.splice(i, 1)
      }
    })
  }
  get (type, id) {
    let res = null;
    this[type].forEach(item => {
      if(item.id === id || item.opts.id === id) res = item
    })
    return res;
  }
}
