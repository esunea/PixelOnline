import {Renderer, Sprite, Room} from './';

import {setRequestAnimationFrame, AABB} from '../utils/helpers';
import {PaneManager} from '../ui/';
import {Account} from '../Account';
import {Point} from '../utils/math';
import $ from 'webpack-zepto'


export class Game {
  constructor(socket) {
    this.loop = this.loop.bind(this)﻿;
    this.fps = 30
    this.interval = 1000/this.fps
    setRequestAnimationFrame()
    this.lastTime = (new Date()).getTime()
    this.currentTime = 0
    this.delta = 0
    this.socket = socket
    this.sprites = []
    this.room = null
    this.renderer = new Renderer()
    this.ui = new PaneManager();

    this.account = new Account(socket)
    //* CONTROLS ---------------
    window.addEventListener('resize', event => {
      this.renderer.getCanvas().width = window.innerWidth
      this.renderer.getCanvas().height = window.innerHeight
    })
    this.isMouseDown = false
    this.lastDown = new Point(0,0)
    this.lastUp = new Point(0,0)
    this.previousMouse = new Point(0, 0)

    $(document).on('mousedown', "#canvas", event => {
      this.isMouseDown = true
      this.lastDown = new Point(event.pageX, event.pageY)
      if (this.room) this.room.onClick()
    })

    $(document).on('mouseup', "#canvas", event => {
      this.isMouseDown = false
    })

    $(document).on('mousemove', "#canvas", event => {

      if (this.room) {
        if (this.isMouseDown) {
          this.room.x += (event.pageX - this.previousMouse.x)
          this.room.y += (event.pageY - this.previousMouse.y)
        }
        this.previousMouse = new Point(event.pageX, event.pageY)
        if (AABB(this.previousMouse, this.room)) {
          let screenPos = new Point(
            ((event.pageX - this.room.x - (this.room.heightTile * this.room.floor.width / 2))),
            ((event.pageY - this.room.y))
          )
          let isoPos = new Point(
            (screenPos.x / (this.room.floor.width / 2)  +  screenPos.y / (this.room.floor.height / 2)) /2,
            (screenPos.y / (this.room.floor.height / 2) - (screenPos.x / (this.room.floor.width / 2))) /2
          )
          this.room.setCursor(isoPos.floor())
        } else {
          this.room.setCursor(-1, -1)
        }
      }
    })
    this.loop()
  }
  enterRoom (room) {
    this.room = new Room(this, room)
  }
  update () {
    if (this.room) this.room.update()
  }
  render () {
      this.renderer.clearrender()
      if (this.room) this.renderer.render([this.room])
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
