import {IsoSprite} from '../../'

export class Ball extends IsoSprite{
  constructor(isoX, isoY, room) {
      super(document.querySelector('#img-ball'), isoX, isoY, room)
  }
}
