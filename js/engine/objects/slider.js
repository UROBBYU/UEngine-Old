import Plane from './plane.js'

export default class extends Plane {

  constructor(options) {
    super(options)
    let me = this

    me.slider = Object.create({},{
      x: {
        set(val) { me.data.slider.value[0] = val },
        get: () => me.data.slider.value[0]
      },
      y: {
        set(val) { me.data.slider.value[1] = val },
        get: () => me.data.slider.value[1]
      }
    })
  }
}
