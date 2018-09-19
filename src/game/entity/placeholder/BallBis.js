import {IsoSprite} from '../../'

export class BallBis extends IsoSprite{
  constructor(isoX, isoY, room) {
      super(document.querySelector('#img-ball2'), isoX, isoY, room)
  }
}
