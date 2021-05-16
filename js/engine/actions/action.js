import createEventBus from '../eventbus.js'

export default class {
  constructor(speed, func) {
    createEventBus(this)
    this.run = () => {
      this.events.fire('beforerun')
      func(this.game)
      this.events.fire('afterrun')
    }
    this.speed = speed
    this.stop()
  }

  start() {
    if (!this.id)
      this.id = setInterval(this.run, this.speed)
  }

  stop() {
    if (this.id) {
      clearInterval(this.id)
      delete this.id
    }
  }
}
