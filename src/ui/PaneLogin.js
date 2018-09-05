import {Pane} from "./";

export class PaneLogin extends Pane {
  constructor () {
    super();
  }
  create (width, height, id, title) {
    super.create(width, height, id, title)
    document.querySelector('#' + this.id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <label class="fullwidth noselect" for="email$">Email:</label>
        <input name="email$" type="text" placeholder="Johndoe@mail.com" />
        <label class="fullwidth noselect" for="password$">Password</label>
        <input name="password" type="password$" placeholder="••••" />
        <div class="buttons noselect">
          <button>Register</button>
          <button class="primary" id="` + this.id + `--submit">Connexion</button>
        </div>
      </div>
    `;
    this.initForm();
  }
  initForm () {
    document.querySelector('#' + this.id + '--submit').addEventListener('click', event => {
      event.stopPropagation();
      console.log(event);
    })
  }
}
