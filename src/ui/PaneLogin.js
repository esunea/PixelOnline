import {Pane} from "./Pane";

export class PaneLogin extends Pane {
  constructor () {
    super();
  }
  create (width, height, id, title) {
    super.create(width, height, id, title)
    document.querySelector('#' + id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <label class="fullwidth noselect" for="email$">Email:</label>
        <input name="email$" type="text" placeholder="Johndoe@mail.com" />
        <label class="fullwidth noselect" for="password$">Password</label>
        <input name="password" type="password$" placeholder="••••" />
        <div class="buttons noselect">
          <button>Register</button>
          <button class="primary">Connexion</button>
        </div>
      </div>
    `;
  }
}
