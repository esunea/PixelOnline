import {Pane} from "../";
import $ from 'webpack-zepto'

export class PaneLogin extends Pane {
  constructor () {
    super({
      id: "login-pane",
      width: 300,
      height: 268,
      title: "Login",
      controls: false
    });
    document.querySelector('#' + this.opts.id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <label class="fullwidth noselect" for="` + this.opts.id + `--email">Email:</label>
        <input name="` + this.opts.id + `--email" type="text" placeholder="Johndoe@mail.com" />
        <label class="fullwidth noselect" for="` + this.opts.id + `--password">Password</label>
        <input name="` + this.opts.id + `--password" type="password" placeholder="••••" />
        <div class="twoside noselect">
          <button id="` + this.opts.id + `--register">Register</button>
          <button class="primary" id="` + this.opts.id + `--submit">Connexion</button>
        </div>
      </div>
    `;
    this.initForm();
  }
  initForm () {
    $(document).on('click','#' + this.opts.id + '--submit', event => {
      event.stopPropagation();
      let credentials = {
        email: $('input[name=' + this.opts.id + '--email]').val(),
        password: $('input[name=' + this.opts.id + '--password]').val()
      }
      $(document.body).trigger('login', credentials)
    })
    $(document).on('keyup','#' + this.opts.id + '--submit',function(e){
        if (e.keyCode === 13) {
          event.stopPropagation();
          let credentials = {
            email: $('input[name=' + this.opts.id + '--email]').val(),
            password: $('input[name=' + this.opts.id + '--password]').val()
          }
          $(document.body).trigger('login', credentials)
      }
    });
    $(document).on('click','#' + this.opts.id + '--register', event => {
      event.stopPropagation();
      $(document.body).trigger('openRegister')
    })
  }
}
