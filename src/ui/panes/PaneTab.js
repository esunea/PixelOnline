import interact from "interactjs";
import {Pane} from "../"
import $ from 'webpack-zepto'

export class PaneTab extends Pane {
  constructor (options) {
    super(options)
    this.opts.btnId = this.opts.id.replace("-pane", "-button")
  }
}
