import {Sprite} from "../"

export class Player extends Sprite {
  constructor(img, x, y) {
    this.img = document.querySelector('#img-ball')
    this.x = x
    this.y = y
    this.width = img.width
    this.height = img.height
  }
  render (ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
