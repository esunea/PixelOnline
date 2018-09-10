import {Pane} from "../";
import $ from 'webpack-zepto'

export class PaneChat extends Pane {
  constructor () {
    super({
      id: "chat-pane",
      width: 300,
      height: 400,
      title: "Chat",
      controls: false,
      active:false
    });
    document.querySelector('#' + this.opts.id + ' .window--content').innerHTML = `
      <div class="window--margins">
        <div class="window--chat"></div>
        <input name="` + this.opts.id + `--message" type="text" placeholder="Type your message..." />
      </div>
    `;
    this.initForm();
  }
  initForm () {

  }
}
