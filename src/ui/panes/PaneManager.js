import {Pane, PaneButton, PaneLogin, PaneRegister, PaneTab} from "../";
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
  }
  createLogin() {
    let pane = new PaneLogin();
    this.panes.push(pane)
    $(document).on('openRegister', event => {
      this.get('panes', 'login-pane').toggleActive();
      this.createRegister();
    })
  }
  createRegister() {
    let pane = new PaneRegister()
    pane.setZIndex(++this.z)
    this.panes.push(pane)

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
    pane.setZIndex(++this.z)
    pane.toggleActive();
    this.panes.push(pane)
    this.buttons.push(button)
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
