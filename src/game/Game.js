import {Renderer, Sprite, Room} from './';

import {setRequestAnimationFrame, AABB} from '../utils/helpers';
import {Point} from '../utils/math';


export class Game {
  constructor(socket) {
    this.renderer = new Renderer()
    this.loop = this.loop.bind(this)﻿;
    this.fps = 30
    this.interval = 1000/this.fps
    this.lastTime = (new Date()).getTime()
    this.currentTime = 0
    this.delta = 0

    this.sprites = [new Room(this)]
    window.addEventListener('resize', event => {
      this.renderer.canvas.width = window.innerWidth / 2
      this.renderer.canvas.height = window.innerHeight / 2
    })
    console.log(this.sprites[0].getMap2d());
    this.isMouseDown = false
    this.lastDown = new Point(0,0)
    this.lastUp = new Point(0,0)
    this.renderer.canvas.addEventListener('mousedown', event => {
      this.isMouseDown = true
      this.lastDown = new Point(event.pageX, event.pageY)
    })
    this.renderer.canvas.addEventListener('mouseup', event => {
      this.isMouseDown = false
    })
    this.previousMouse = new Point(0, 0)
    this.renderer.canvas.addEventListener('mousemove', event => {
      let map = this.sprites[0]

      if (this.isMouseDown) {
        map.x += (event.pageX - this.previousMouse.x)
        map.y += (event.pageY - this.previousMouse.y)
      }
      this.previousMouse = new Point(event.pageX, event.pageY)

      if (AABB(this.previousMouse, map)) {
        let screenPos = new Point(
          ((event.pageX - this.sprites[0].x - (map.heightTile * map.floor.width / 2))),
          ((event.pageY - this.sprites[0].y))
        )
        let isoPos = new Point(
          (screenPos.x / (map.floor.width / 2)  +  screenPos.y / (map.floor.height / 2)) /2,
          (screenPos.y / (map.floor.height / 2) - (screenPos.x / (map.floor.width / 2))) /2
        )
        map.setCursor(isoPos.floor())
      } else {
        map.setCursor(-1, -1)
      }
    })
    this.loop()
  }
  update () {

  }
  render () {
      this.renderer.render(this.sprites)
  }
  loop () {
    window.requestAnimationFrame(() => { this.loop() })
    this.update()
    this.currentTime = (new Date()).getTime()
    this.delta = (this.currentTime-this.lastTime)

    if(this.delta > this.interval) {
        this.render()
        this.lastTime = this.currentTime - (this.delta % this.interval)
    }
  }
}
