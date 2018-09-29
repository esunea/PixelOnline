import {Sprite} from "../"
import {Point} from "../../utils/math"
export class SpriteSheet extends Sprite {
  constructor(img, x, y, width, height) {
    super(img, x, y)
    this.width = width
    this.height = height
    this.frameLength = new Point(Math.floor(this.img.width / this.width) ,Math.floor(this.img.height / this.height))
    this.frame = 0
    this.frameX = 0
    this.frameY = 0
    this.visible = true
  }

  setFrame (frame) {
    this.frame = frame
    this.frameX = Math.floor(frame / this.frameLength.x)
    this.frameY = frame - this.frameX * this.frameLength.x
  }

  setVisible (newVisible) {
    this.visible = newVisible
  }

  render (ctx, noffset) {
    if (!this.visible) return;
    ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}
