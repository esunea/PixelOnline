import {Pane} from "../";
import $ from 'webpack-zepto'

export class PaneRegister extends Pane {
  constructor () {
    super({
      id: "register-pane",
      width: 300,
      height: 340,
      title: "Register",
      controls: true
    });
    document.querySelector('#' + this.opts.id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <label class="fullwidth noselect" for="` + this.opts.id + `--username">Username:</label>
        <input autocomplete="false" name="` + this.opts.id + `--username" type="text" placeholder="Johndoe" />

        <label class="fullwidth noselect" for="` + this.opts.id + `--email">Email:</label>
        <input autocomplete="false" name="` + this.opts.id + `--email" type="text" placeholder="Johndoe@mail.com" />

        <label class="fullwidth noselect" for="` + this.opts.id + `--password">Confirmation</label>
        <input autocomplete="new-password" name="` + this.opts.id + `--password" type="password" placeholder="••••" />
        <div class="buttons noselect">
          <div></div>
          <button class="primary" id="` + this.opts.id + `--submit">Register</button>
        </div>
      </div>
    `;
    this.initForm();
  }
  initForm () {
    $(document).on('click','#' + this.opts.id + '--submit', event => {
      event.stopPropagation();
      let credentials = {
        username: $('input[name=' + this.opts.id + '--username]').val(),
        email: $('input[name=' + this.opts.id + '--email]').val(),
        password: $('input[name=' + this.opts.id + '--password]').val()
      }
      $(document.body).trigger('register', credentials)
    })
  }
  close () {
    $(document.body).trigger('closeRegister', {id:this.opts.id})
  }
}
