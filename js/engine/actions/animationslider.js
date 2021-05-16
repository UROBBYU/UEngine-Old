import Animation from './animation.js'

export default class extends Animation {
  constructor(speed, object, texture, stepX = 0, stepY = 0) {
    super(speed, object, texture, () => {
      if (object.texture !== texture)
        object.texture = texture
      object.slider.x -= this.step.x
      object.slider.y -= this.step.y
    })
    this.step = {
      x: stepX,
      y: stepY
    }
  }
}
