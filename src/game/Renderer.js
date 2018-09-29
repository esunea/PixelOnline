import $ from 'webpack-zepto'

export class Renderer {
  constructor () {
    this.canvas = $('#canvas')[0];
    this.ctx = canvas.getContext('2d');
    console.log($('#canvas'));
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.clearrender()
  }
  clearrender () {
    this.ctx.fillStyle = "#111"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  render (entries) {
    entries.forEach(entry => entry.render(this.ctx))
  }
  getCanvas () {
    this.canvas = $('#canvas')[0];
    this.ctx = canvas.getContext('2d');
    return this.canvas
  }
}
