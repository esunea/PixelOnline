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
    this.first = false;
    window.game.socket.on('rooms', data => {
      let rooms = JSON.parse(data).rooms;
      $('#' + this.opts.id + ' .window--content .rooms').empty()
      rooms.forEach(room => {
        $('#' + this.opts.id + ' .window--content .rooms').append(`<li class="room" data-roomid="` + room._id + `">
          <span>` + room.name + `</span>
          <span>` + room.users + `</span>
        </li>`)
        if (!this.first) {
          this.first = true
          window.game.socket.emit('enterRooms', JSON.stringify({roomId:room._id.toString()}));
        }
      })
    });
    window.game.socket.on('enteredRoom', data => {
      data = JSON.parse(data)
      window.game.enterRoom(data.room)
    });
    $(document).on('click', '.room', event => {
      let roomId = event.currentTarget.dataset.roomid
      window.game.socket.emit('enterRooms', JSON.stringify({roomId:roomId}));
      this.close()
    })
  }
  toggleActive () {
    this.opts.active = !this.opts.active;
    $("#" + this.opts.id).toggle()
    if(!this.opts.active) window.game.socket.emit('getRooms');
  }
}
