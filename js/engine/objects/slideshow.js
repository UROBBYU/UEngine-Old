import Plane from './plane.js'

import glUtils from '../gl-utils.js'

export default class extends Plane {
  constructor(options) {
    super(options)
    let me = this

    me.slideshow = {
      count: 1,
      index: options.slide || 0
    }
  }

  set slide(val) {
    this.slideshow.index = val
    super.texture = {
      image: this.slideshow.slides[val]
    }
  }

  get slide() {
    return this.slideshow.index
  }

  set texture(val) {
    let tex = val.texture || val
    let image = tex.image || tex,
        size = tex.size || [100, 100],
        scale = tex.scale || [1, 1],
        anchor = tex.anchor || [0, 0],
        slides = val.slides || 1,
        slide = val.slide || me.slideshow.index

    this.slideshow.index = slide
    this.slideshow.slides = []
    this.slideshow.texture = image

    let promises = [],
        slideWidth = image.width / slides
    for (var i = 0; i < slides; i++) {
      promises.push(glUtils.cropBitmap(image, slideWidth * i, 0, slideWidth, image.height).then(img => this.slideshow.slides.push(img)))
    }
    Promise.all(promises).then(() => {
      this.size.x = size[0]
      this.size.y = size[1]
      this.scale.x = scale[0]
      this.scale.y = scale[1]
      this.anchor.x = anchor[0]
      this.anchor.y = anchor[1]
      this.slide = slide
    })
  }

  get texture() {
    return this.slideshow.texture
  }
}
