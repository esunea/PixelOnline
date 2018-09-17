export class Renderer {
  constructor () {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
  render (entries) {
    this.ctx.fillStyle = "#000011"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    entries.forEach(entry => entry.render(this.ctx))
  }
}
