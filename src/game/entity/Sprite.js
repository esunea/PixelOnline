export class Sprite {
  constructor(img, x, y) {
    this.img = img
    this.x = x
    this.y = y
    this.width = img.width
    this.height = img.height
    this.visible = true
  }
  
  setVisible (newVisible) {
    this.visible = newVisible
  }
  render (ctx) {
    if (!this.visible) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
