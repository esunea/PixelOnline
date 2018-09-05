import {Pane, ButtonTab, PaneLogin} from "./";
import $ from 'webpack-zepto'

export class PaneManager {
  constructor () {
    this.panes = [];
    this.buttons = [];
    this.z = 1000;
  }
  create (width, height, id, title) {
    let pane = new Pane()
    pane.create(width, height, id, title)
    pane.setZIndex(++this.z)
    $("#" + pane.id).addEventListener('click', evt => {
      console.log(evt);
    })
    pane.setCentered()
    pane.setInteractable()
    this.panes.push(pane)
  }
  createLogin() {
    let pane = new PaneLogin()
    pane.create(300, 268, 'login', "Login")
    pane.setZIndex(++this.z)
    pane.setCentered()
    pane.setInteractable()
    this.panes.push(pane)
  }
  createTchat() {
    let pane = new Pane()
    let button = new ButtonTab('tchat', 'tchat')
    pane.create(300, 450, 'tchat', "Tchat")
    pane.setZIndex(++this.z)
    pane.setCentered()
    pane.setInteractable()
    pane.toggleActive();
    this.panes.push(pane)
    this.buttons.push(button)
    $(document).on('click', '#tchat-button', event => {
      console.log(event);
      this.get("buttons", "tchat-button").toggleActive();
      this.get("panes", "tchat-pane").toggleActive();
      return false;
    })
  }
  createRooms() {
    let pane = new Pane()
    let button = new ButtonTab('rooms', 'rooms')
    pane.create(300, 450, 'rooms', "Rooms")
    pane.setZIndex(++this.z)
    pane.setCentered()
    pane.setInteractable()
    pane.toggleActive();
    this.panes.push(pane)
    this.buttons.push(button)
    $(document).on('click', '#rooms-button', event => {
      console.log(event);
      this.get("buttons", "rooms-button").toggleActive();
      this.get("panes", "rooms-pane").toggleActive();
      return false;
    })
  }
  get (type, id) {
    let res = null;
    this[type].forEach(item => {
      if(item.id === id) res = item
    })
    return res;
  }
}
