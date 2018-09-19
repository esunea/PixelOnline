import {IsoSprite} from '../../'

export class BallMini extends IsoSprite{
  constructor(isoX, isoY, room) {
      super(document.querySelector('#img-ballmini'), isoX, isoY, room)
  }
}
