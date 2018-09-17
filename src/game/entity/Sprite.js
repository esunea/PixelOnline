export class Sprite {
  constructor(img, x, y) {
    this.img = img
    this.x = x
    this.y = y
    this.width = img.width
    this.height = img.height
  }
  render (ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
