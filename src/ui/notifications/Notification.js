import $ from 'webpack-zepto'

export class Notification {
  constructor(message, type, duration) {
    this.type = type || ""
    this.message = message || "Notification!!!"
    this.duration = duration || 2000
    this.id = `notification-` + Math.floor(Math.random() * 1000)
    this.elem = `<div id="` + this.id + `" class="notification appear ` + this.type + `">
      ` + this.message + `
    </div>`
    $('#notifications').append(this.elem);
    setTimeout(evt => {$("#" + this.id).toggleClass('appear') }, 100)
    setTimeout(evt => {$("#" + this.id).toggleClass('appear') }, this.duration)
    setTimeout(evt => {$("#" + this.id).remove() }, this.duration + 500)
  }
}
