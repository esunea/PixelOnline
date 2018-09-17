import {AABB} from '../helpers';
import {Rectangle} from './';

export class Point extends Rectangle{
  constructor (x, y) {
    super(x, y, 1, 1)
  }
  isNear (point, int) {
    let interval = int || 10
    let rect = new Rectangle(point.x - interval / 2, point.y - interval / 2, interval, interval)
    return AABB(rect, this)
  }
  floor() {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }
}
