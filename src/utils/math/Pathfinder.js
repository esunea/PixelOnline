import {Point} from "./"
export class Pathfinder{
  constructor (map) {
    this.closed = []
    this.open = []
    this.step = 0
    this.map = map
    return this
  }
  newStep (xC, yC, xT, yT, totalSteps, parentStep) {
    let h = this.distanceM(xC, yC, xT, yT);
    return {
      x: xC,
      y: yC,
      g: totalSteps,
      h: h,
      f: totalSteps + h,
      parent: parentStep
    }
  }
  addTo (type, step) {
    this[type].push(step)
    return this
  }
  removeTo (type, step) {
    for (var i = 0; i < this[type].length; i++) {
      if (this[type][i] === step) this[type].splice(i, 1);
    }
    return this
  }
  isInTo (type, step) {
    for (var i = 0; i < this[type].length; i++) {
      if (this[type][i].x === step.x && this[type][i].y === step.y) return this[type];
    }
    return false
  }
  getBestOpen () {
    let bestI = 0
    for (var i = 0; i < this.open.length; i++) {
      if (this.open[i].f < this.open[bestI].f) bestI = i
    }
    return this.open[bestI]
  }

  distanceM (xC, yC, xT, yT) {
    let dx = Math.abs(xT - xC), dy = Math.abs(yT - yC);
    return dx + dy;
  }
  outOfBounds (x, y) {
    return y < 0 || y >= this.map.length ||
    x < 0 || x >= this.map[0].length;
  }
  getNeighbors (x, y) {
    var neighbors = [];

    // Check left, right, top, bottom
    if (!this.blocked(x + 1, y)) neighbors.push(new Point(x + 1, y));
    if (!this.blocked(x - 1, y)) neighbors.push(new Point(x - 1, y));
    if (!this.blocked(x, y + 1)) neighbors.push(new Point(x, y + 1));
    if (!this.blocked(x, y - 1)) neighbors.push(new Point(x, y - 1));


    if (!this.blocked(x + 1, y + 1) && (!this.blocked(x + 1, y) || !this.blocked(x, y + 1))) neighbors.push(new Point(x + 1, y + 1));
    if (!this.blocked(x - 1, y - 1) && (!this.blocked(x - 1, y) || !this.blocked(x, y - 1))) neighbors.push(new Point(x - 1, y - 1));
    if (!this.blocked(x + 1, y - 1) && (!this.blocked(x + 1, y) || !this.blocked(x, y - 1))) neighbors.push(new Point(x + 1, y - 1));
    if (!this.blocked(x - 1, y + 1) && (!this.blocked(x - 1, y) || !this.blocked(x, y + 1))) neighbors.push(new Point(x - 1, y + 1));

    return neighbors;
  }

  blocked (x, y) {
    return (this.outOfBounds(x, y) || this.map[y][x] === 0)
  }

  findPath (xC, yC, xT, yT, maxSteps) {
    var current, // Current best open tile
    neighbors, // Dump of all nearby neighbor tiles
    neighborRecord, // Any pre-existing records of a neighbor
    stepCost, // Dump of a total step score for a neighbor
    i,
    stepCount = 0,
    diagonalAllowed = true;

    // You must add the starting step
    this.reset()
    .addTo('open', this.newStep(xC, yC, xT, yT, this.step));

    while (this.open.length !== 0 && stepCount < 100) {
      stepCount++
      current = this.getBestOpen();

      // Check if goal has been discovered to build a path
      if (current.x === xT && current.y === yT) {
        return this.buildPath(current, []).reverse()
      }

      // Move current into closed set
      this.removeTo('open', current)
      .addTo('closed', current);

      // Get neighbors from the map and check them
      neighbors = this.getNeighbors(current.x, current.y);
      for (i = 0; i < neighbors.length; i++) {
        // Get current step and distance from current to neighbor
        stepCost = current.g + 1;

        // Check for the neighbor in the closed set
        // then see if its cost is >= the stepCost, if so skip current neighbor
        neighborRecord = this.isInTo('closed', neighbors[i]);
        if (neighborRecord && stepCost >= neighborRecord.g)
        continue;

        // Verify neighbor doesn't exist or new score for it is better
        neighborRecord = this.isInTo('open', neighbors[i]);
        if (!neighborRecord || stepCost < neighborRecord.g) {
          if (!neighborRecord) {
            this.addTo('open', this.newStep(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
          } else {
            neighborRecord.parent = current;
            neighborRecord.g = stepCost;
            neighborRecord.f = stepCost + neighborRecord.h;
          }
        }
      }
    }

    return false;
  }

  buildPath (tile, stack) {
    stack.push(tile);

    if (tile.parent) {
      return this.buildPath(tile.parent, stack);
    } else {
      return stack;
    }
  }
  reset () {
    this.closed = []
    this.open = []
    return this
  }
}
