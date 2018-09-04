import {Pane} from "./Pane";

export class PaneLogin extends Pane {
  constructor () {
    super();
  }
  create (width, height, id, title) {
    super.create(width, height, id, title)
    document.querySelector('#' + id + ' .window--content').innerHTML = "LOGIN"
  }
}
