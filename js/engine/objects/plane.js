import glUtils from '../gl-utils.js'

export default class Plane {
  constructor(options) {
    let position = options.position || [0, 0],
        slider = options.slider || [0, 0],
        rotation = options.rotation || 0,
        pinToScreen = options.pinToScreen || false,
        visible = (typeof options.visible == 'boolean') ? options.visible : true,
        me = this

    me.bounds = ((options.bounds) ? {
      top: options.bounds.top || options.bounds[0],
      right: options.bounds.right || options.bounds[1],
      bottom: options.bounds.bottom || options.bounds[2],
      left: options.bounds.left || options.bounds[3]
    } : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })

    me.z = options.z || 1

    me.data = {
      size: glUtils.uniformF(100, 100),
      scale: glUtils.uniformF(1, 1),
      position: glUtils.uniformF(position[0], position[1]),
      pinToScreen: glUtils.uniformI(pinToScreen),
      visible: glUtils.uniformI(visible),
      slider: glUtils.uniformF(0, 0),
      anchor: glUtils.uniformF(0, 0),
      rotation: glUtils.uniformF(Math.cos(rotation), Math.sin(rotation))
    }

    me.size = Object.create({},{
      x: {
        set(val) { me.data.size.value[0] = val },
        get: () => me.data.size.value[0]
      },
      y: {
        set(val) { me.data.size.value[1] = val },
        get: () => me.data.size.value[1]
      }
    })

    me.scale = Object.create({},{
      x: {
        set(val) { me.data.scale.value[0] = val },
        get: () => me.data.scale.value[0]
      },
      y: {
        set(val) { me.data.scale.value[1] = val },
        get: () => me.data.scale.value[1]
      }
    })

    me.position = Object.create({},{
      x: {
        set(val) { me.data.position.value[0] = val },
        get: () => me.data.position.value[0]
      },
      y: {
        set(val) { me.data.position.value[1] = val },
        get: () => me.data.position.value[1]
      }
    })

    me.anchor = Object.create({},{
      x: {
        set(val) { me.data.anchor.value[0] = val },
        get: () => me.data.anchor.value[0]
      },
      y: {
        set(val) { me.data.anchor.value[1] = val },
        get: () => me.data.anchor.value[1]
      }
    })

    me.rotation = Object.create({},{
      rad: {
        set(val) {
          me.data.rotation.value[0] = Math.cos(val)
          me.data.rotation.value[1] = Math.sin(val)
        },
        get() {
          let rot = Math.acos(me.data.rotation.value[0])
          if (me.data.rotation.value[1] < 0)
            rot = Math.PI * 2 - rot
          return rot
        }
      },
      deg: {
        set(val) { me.rotation.rad = val / 180 * Math.PI },
        get: () => Number.parseFloat((me.rotation.rad / Math.PI * 180).toFixed(4))
      }
    })

    me.colliders = new Map()
  }

  flipX() {
    this.size.x = -this.size.x
  }

  flipY() {
    this.size.y = -this.size.y
  }

  set texture(val) {
    this.data.texture = glUtils.texture(val.image)
    if (val.size)
      this.data.size.value = [val.size[0], val.size[1]]
    if (val.scale)
      this.data.scale.value = [val.scale[0], val.scale[1]]
    if (val.anchor)
      this.data.anchor.value = [val.anchor[0], val.anchor[1]]
    if (val.bounds)
      this.bounds = {
        top: val.bounds.top || val.bounds[0] || this.bounds.top,
        right: val.bounds.right || val.bounds[1] || this.bounds.right,
        bottom: val.bounds.bottom || val.bounds[2] || this.bounds.bottom,
        left: val.bounds.left || val.bounds[3] || this.bounds.left
      }
  }

  get texture() {
    return (this.data.texture ? this.data.texture.value : undefined)
  }

  set pinToScreen(val) {
    this.data.pinToScreen = glUtils.uniformI(val)
  }

  get pinToScreen() {
    return this.data.pinToScreen.value
  }
}
