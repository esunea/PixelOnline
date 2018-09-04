import {Pane} from "./Pane";
import {PaneLogin} from "./PaneLogin";

export class PaneManager {
  constructor () {
    this.panes = [];
    this.z = 1000;
  }
  create (width, height, id, title) {
    let pane = new Pane()
    pane.create(width, height, id, title)
    pane.setZIndex(++this.z)
    document.querySelector("#" + pane.id).addEventListener('click', evt => {
      console.log(evt);
    })
    pane.setCentered()
    pane.setInteractable()
    this.panes.push(pane)
  }
  createLogin() {
    let pane = new PaneLogin()
    pane.create(300, 300, 'login', "Login")
    pane.setZIndex(++this.z)
    document.querySelector("#" + pane.id).addEventListener('click', evt => {
      console.log(evt);
    })
    pane.setCentered()
    this.panes.push(pane)
  }
}
