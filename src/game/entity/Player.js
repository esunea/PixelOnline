import {IsoSprite} from "../"

export class Player extends IsoSprite {
  constructor(x, y, room) {
    super(document.querySelector('#img-ball'), x, y, room)
  }
}
