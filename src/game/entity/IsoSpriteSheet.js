import {Sprite} from '../'

export class IsoSpriteSheet extends Sprite {
  constructor(img, x, y, width, height, room) {
    super(img, x, y)
    this.room = room
    this.width = width
    this.height = height
    this.frameLength = new Point(Math.floor(this.img.width / this.width) ,Math.floor(this.img.height / this.height))
    this.frame = 0
    this.frameX = 0
    this.frameY = 0
    this.visible = true
    this.setIsoXY(x, y)
  }
  setIsoXY(x, y) {
    this.isoX = x
    this.isoY = y
  }

  setFrame (frame) {
    this.frame = frame
    this.frameX = Math.floor(frame / this.frameLength.x)
    this.frameY = frame - this.frameX * this.frameLength.x
  }

  update () {
      this.x = this.room.x + (this.room.heightTile * this.room.floor.width / 2 - this.room.floor.width / 2) + (this.isoX - this.isoY) * this.room.floor.width / 2
      this.y = this.room.y + (this.isoX + this.isoY) * this.room.floor.height / 2
  }

  render (ctx, noffset) {
    if (!this.visible) return;
    ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}
