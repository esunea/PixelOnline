import {Pane} from "./";
import $ from 'webpack-zepto'

export class PaneLogin extends Pane {
  constructor () {
    super();
  }
  create (width, height, id, title) {
    super.create(width, height, id, title)
    document.querySelector('#' + this.id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <label class="fullwidth noselect" for="` + this.id + `--email">Email:</label>
        <input name="` + this.id + `--email" type="text" placeholder="Johndoe@mail.com" />
        <label class="fullwidth noselect" for="` + this.id + `--password">Password</label>
        <input name="` + this.id + `--password" type="password" placeholder="••••" />
        <div class="buttons noselect">
          <button>Register</button>
          <button class="primary" id="` + this.id + `--submit">Connexion</button>
        </div>
      </div>
    `;
    this.initForm();
  }
  initForm () {
    $(document).on('click','#' + this.id + '--submit', event => {
      event.stopPropagation();
      let credentials = {
        email: $('input[name=' + this.id + '--email]').val(),
        password: $('input[name=' + this.id + '--password]').val()
      }
      let loginEvent = new CustomEvent('login', { 'detail': credentials });
      document.body.dispatchEvent(loginEvent);
    })
  }
}
