import $ from 'webpack-zepto'
import {Notification} from './ui/'
import 'clientjs'
export class Account {
  constructor(socket) {
    this.username = null;
    this.email = null;
    this.id = null;
    this.token = null;
    this.socket = socket
    console.log(this.getFingerPrint());
    $(document).on('login', (event, args) => {
      this.socket.emit('login', JSON.stringify(args));
    })
    $(document).on('register', (event, args) => {
      this.socket.emit('register', JSON.stringify(args));
    })
    this.socket.on('registerResponse', function (res) {
      res = JSON.parse(res)
      if (!res.error) {
        console.log(res);
        $(document.body).trigger('closeRegister')
        new Notification("Inscription validée!","success", 3000);
      } else new Notification(res.error,"error", 3000);
    })
    this.socket.on('loginResponse', function (res) {
      res = JSON.parse(res)
      if (!res.error) {
        console.log(res);
        this.username = res.username;
        this.email = res.email;
        window.game.panemanager.setConnected()
        new Notification("Bonjour " + res.username + "!","success", 3000);
      } else new Notification(res.error,"error", 3000);
    })
  }
  getFingerPrint() {
    return new ClientJS().getFingerprint()
  }
}
