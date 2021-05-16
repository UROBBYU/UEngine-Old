import Animation from './animation.js'

export default class extends Animation {
  constructor(speed, object, texture, options = {times: 1}) {
    super(speed, object, texture, game => {
      if (this.times == 0 || this.loop < this.times) {
        object.slide = this.sequence[this.step]
        this.step++
        if (this.step >= this.sequence.length) {
          this.step = 0
          this.loop++
        }
      } else {
        this.stop()
        if (this.onseqend)
          this.onseqend(game, object)
      }
    })
    this.sequence = options.sequence || [...Array(object.slideshow.slides.length).keys()]
    this.onseqend = options.onseqend
    this.times = options.times
    this.step = 0
    this.loop = 0
    this.pause = this.stop
    this.stop = () => {
      this.pause()
      this.step = 0
      this.loop = 0
    }
  }
}
