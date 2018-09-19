import {Sprite} from '../'

export class IsoSprite extends Sprite {
  constructor(img, x, y, room) {
    super(img, x, y)
    this.isoX = x
    this.isoY = y
    this.x = room.x + (room.widthTile * room.floor.width / 2) + (x - y) * room.floor.width / 2
    this.y = room.y + (x + y) * room.floor.height / 2 + room.floor.height - (this.height - room.floor.height)
    this.room = room
  }
  render (ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}
