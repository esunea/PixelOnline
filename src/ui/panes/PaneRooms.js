import {PaneTab} from "../";
import $ from 'webpack-zepto'

export class PaneRooms extends PaneTab {
  constructor () {
    super({
      id: "rooms-pane",
      width: 300,
      height: 340,
      title: "Rooms",
      controls: true,
      active:false
    });
    document.querySelector('#' + this.opts.id + ' .window--content').innerHTML = `
      <div class="window--marsins">
      <ul class="rooms">
        <li>
          <span>Title</span>
          <span>2/10</span>
        </li>
        <li>
          <span>Title</span>
          <span>2/10</span>
        </li>
        <li>
          <span>Title</span>
          <span>2/10</span>
        </li>
        <li>
          <span>Title</span>
          <span>2/10</span>
        </li>
      </ul>
      </div>
    `;
  }
}
