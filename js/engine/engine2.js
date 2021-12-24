/*
!!!Broken code!!!
UEngine v0.2
Author: UROBBYU

This engine extends WebGL2 capabilities.
Easy to use - easy to run.
*/

import Plane from './objects/plane.js'
import Slider from './objects/slider.js'
import SlideShow from './objects/slideshow.js'

import Action from './actions/action.js'
import Animation from './actions/animation.js'
import AnimationSlider from './actions/animationslider.js'
import AnimationSlideShow from './actions/animationslideshow.js'

import Texture from './texture.js'

import glUtils from './gl-utils.js'
import createEventBus from './eventbus.js'

window.glUtils = glUtils

export default class Game {
  static Plane = Plane
  static Slider = Slider
  static SlideShow = SlideShow

  static Action = Action
  static Animation = Animation
  static AnimationSlider = AnimationSlider
  static AnimationSlideShow = AnimationSlideShow

  static Texture = Texture

  constructor(canvas) {

    //--------INITIALIZATION--------//

    let me = this
    let gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false
    })
    if (!gl) {
      console.error("Couldn't initialize WebGL")
      return
    }
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 1)
    createEventBus(me)

    //--------SHADER--------//

    let shaderData = `#version 300 es
precision mediump float;
`

    let vertex = `
in vec2 coord;

uniform vec2 resolution;
uniform vec2 anchor;
uniform vec2 position;
uniform bool pinToScreen;
uniform vec2 slider;
uniform vec2 size;
uniform vec2 rotation;
uniform vec2 camera;

out vec2 texPos;

void main() {
 vec2 pos = coord * size + (pinToScreen ? 0. : camera);
 pos -= anchor * size;
 pos = vec2(
  pos.x * rotation.x + pos.y * rotation.y,
  pos.y * rotation.x - pos.x * rotation.y
 );
 pos += position;
 pos = pos / resolution;

 texPos = coord;
 texPos -= slider / size;
 texPos.y = -texPos.y;

 gl_Position = vec4(pos * 2. - 1., 0, 1);
}`

    let fragment = `
in vec2 texPos;

uniform sampler2D tex;
uniform vec2 scale;
uniform bool visible;

out vec4 fragColor;

void main() {
 vec2 texSize = vec2(textureSize(tex, 0));
 if (visible)
  fragColor = texture(tex, texPos / scale);
 else
  fragColor = vec4(0, 0, 0, 0);
}`

    //--------SCENE--------//

    let camera = {
      width: canvas.width,
      height: canvas.height,
      x: 0,
      y: 0
    }

    me.scene = {
      gl: gl,
      layers: 1000,
      camera: new Proxy(camera, {
        set(target, prop, val) {
          target[prop] = val
          if (prop == 'width' || prop == 'height') {
            canvas.width = target.width
            canvas.height = target.height
            me.scene.renderer.resize()
          }
          return true
        }
      }),
			objects: {
        list: [],
        map: new Map(),
        sort() {
          me.scene.objects.list.sort((val1, val2) => val1[0] > val2[0])
        },
        *[Symbol.iterator]() {
          for (let obj of me.scene.objects.list) {
            yield obj[1]
          }
        }
      },
      renderer: {
        programInfo: {
          gl: gl,
          vertex: vertex,
          fragment: fragment,

          set(vertex = me.scene.renderer.programInfo.vertex, fragment = me.scene.renderer.programInfo.fragment) {
            gl.deleteProgram(me.scene.renderer.programInfo.program)
            gl.deleteShader(me.scene.renderer.programInfo.vertexShader)
            gl.deleteShader(me.scene.renderer.programInfo.fragmentShader)
            me.scene.renderer.programInfo.vertexShader = glUtils.createShader(gl, gl.VERTEX_SHADER, shaderData + vertex)
            me.scene.renderer.programInfo.fragmentShader = glUtils.createShader(gl, gl.FRAGMENT_SHADER, shaderData + fragment)
            me.scene.renderer.programInfo.program = glUtils.createProgram(gl, me.scene.renderer.programInfo.vertexShader, me.scene.renderer.programInfo.fragmentShader)
            me.scene.renderer.resize()
          },

          buffers: {
            coord: gl.createBuffer()
          },

          textures: {
            list: [],
            map: new Map(),
            set(name, texture) {
              for (let i = 0; i < me.scene.renderer.programInfo.textures.list.length + 1; i++) {
                if (!me.scene.renderer.programInfo.textures.list[i]) {
                  me.scene.renderer.programInfo.textures.list[i] = texture
                  me.scene.renderer.programInfo.textures.map.set(name, i)
                  break
                }
              }
            },
            get: (name) => me.scene.renderer.programInfo.textures.list[me.scene.renderer.programInfo.textures.getIndex(name)],
            getIndex: (name) => me.scene.renderer.programInfo.textures.map.get(name),
            remove(name) {
              me.scene.renderer.programInfo.textures.list.splice(me.scene.renderer.programInfo.textures.getIndex(name))
              me.scene.renderer.programInfo.textures.map.remove(name)
            }
          }
        },

        draw(plane) {
          gl.useProgram(me.scene.renderer.programInfo.program)
          glUtils.writeUniformF(gl, me.scene.renderer.programInfo.program, 'camera', [me.scene.camera.x, me.scene.camera.y])
          glUtils.update(me.scene.renderer.programInfo, plane.data)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        },

        resize() {
          gl.useProgram(me.scene.renderer.programInfo.program)
          gl.viewport(0, 0, me.scene.camera.width, me.scene.camera.height)
          glUtils.writeUniformF(gl, me.scene.renderer.programInfo.program, 'resolution', [me.scene.camera.width, me.scene.camera.height])
          glUtils.writeBuffer(gl, me.scene.renderer.programInfo.program, me.scene.renderer.programInfo.buffers.coord, 'coord',
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
          )
        }
      },

      add(name, obj) {
        me.scene.objects.map.set(name, obj)
        me.scene.objects.list.push([obj.z, obj])
        me.scene.objects.sort()
      },

      get: (name) => me.scene.objects.map.get(name)
    }

    me.scene.renderer.programInfo.set()

    //--------TEXTURES--------//

    me.textures = Object.create({},{
      set: {get() {return (name, texture) => {
        let src = texture.src
        for (let key in me.textures) if (me.textures.hasOwnProperty(key) && me.textures[key].src === src) {
          me.textures[name] = me.textures[key]
          return
        }
        if (me.textures[name] && !me.textures.propertyIsEnumerable(name)) {
          console.error(`Name '${name}' is reserved`)
          return
        }

        me.loader.toLoad++

        let image = new Image()

        image.onload = () => createImageBitmap(image, 0, 0, image.width, image.height).then(img => {
          let tex = {
            image: img,
            size: texture.size || [100, 100],
            scale: texture.scale || [1, 1],
            anchor: texture.anchor || [0, 0]
          }
          me.textures[name] = tex
          me.loader.toLoad--
        })

        image.onerror = () => {
          me.loader.toLoad = Number.NEGATIVE_INFINITY
          me.isPaused = true
          console.error("Couldn't load image:\n" + src)
        }
        image.src = src
      }}},
      add: {get() {return (name, texture) => {
        if (me.textures[name] && me.textures.propertyIsEnumerable(name)) {
          console.error(`Texture named '${name}' already exists`)
          return
        }

        me.textures.set(name, src)
      }}},
      remove: {get() {return (name) => {
        if (me.textures[name] && !me.textures.propertyIsEnumerable(name)) {
          console.error(`Name '${name}' is reserved`)
          return
        }

        delete me.textures[name]
      }}},
      clear: {get() {return () => {
        for (let key in me.textures) if (me.textures.hasOwnProperty(key))
          delete me.textures[key]
      }}}
    })

    //--------ACTIONS--------//

    me.actions = {}
    me.actions = new Proxy(me.actions, {
      deleteProperty(target, prop) {
        target[prop].stop()
        delete target[prop]
        return true
      }
    })

    //--------LIBRARIES--------//

    me.lib = {}
    me.lib = new Proxy(me.lib, {
      set(object, key, value) {
        if (typeof value != 'object')
          throw new Error("Invalid type")
        if (object.hasOwnProperty(key))
          object[key].unload()
        object[key] = value
        // TODO:
        value.load()
        return true
      }
    })

    /*
    load: (url) => new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => resolve(data))
    })
    */

    //--------DATA LOADER--------//

    me.loader = {
      toLoad: 0,
			wait: () => {
				if (!me.loader.cur) {
					me.loader.cur = new Promise((res, rej) => {
						let inter = setInterval(() => {
							if (me.loader.toLoad === 0) {
								clearInterval(inter)
								me.loader.toLoad = 0
								delete me.loader.cur
								res()
								me.events.fire('textureload')
							} else if (me.loader.toLoad < 0) {
								clearInterval(inter)
								me.loader.toLoad = 0
								delete me.loader.cur
								rej(new Error("TextureLoader couldn't load some textures"))
							}
						}, 50)
					})
				}
				return me.loader.cur
			},
      loadTextures: (tex) => {
				if (tex.constructor === Object) {
					for (let key in tex) {
						if (tex[key].constructor === Object) {
              me.textures.set(key, tex[key])
						} else if (tex[key].constructor === String) {
              me.textures.set(key, tex[key])
						} else
							console.error('Invalid argument: ', tex)
					}
					return me.loader.wait()
				} else if (tex.constructor === Array) {
					tex.forEach(val => {
						if (val.constructor === Object) {
							me.textures.set(val.name, val.file)
						} else if (val.constructor === Array) {
							me.textures.set(val[0], val[1])
						} else if (val.constructor === String) {
							me.textures.set(key, val)
						} else
							console.error('Invalid argument: ', tex)
					})
					return me.loader.wait()
				} else
					console.error('Invalid argument: ', tex)
			}
    }

    //--------CONTROLS--------//

    me.isPaused = true
  }

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
  }

  render(time) {
    if (!this.isPaused) {
      this.scene.gl.clear(this.scene.gl.COLOR_BUFFER_BIT)
      for (let obj of this.scene.objects)
        this.scene.renderer.draw(obj)
    }

    requestAnimationFrame(this.render)
  }

  //--------UNIFORM SHORTCUT--------//

  uni(name, key) {
    if (key)
      return this.scene.get(name).data[key].value
    return this.scene.get(name).data
  }

  //--------COLLIDERS--------//

  addColliders(func, ...args) {
    if (args.length < 2)
      return console.error('At least 2 arguments must be supplied')

    for (var i = 0; i < args.length - 1; i++) {
      for (var j = i + 1; j < args.length; j++) {
        let wasColliding = false

        function collider() {
          let contacts = this.intersects(args[i], args[j])

          func({
            inside: contacts,
            firstCall: contacts ? !wasColliding : wasColliding,
            obj1: args[i],
            obj2: args[j]
          })
          wasColliding = contacts
        }

        if (Game.Plane.prototype.isPrototypeOf(args[i]))
          args[i].colliders.set(args[j], collider)
        if (Game.Plane.prototype.isPrototypeOf(args[j]))
          args[j].colliders.set(args[i], collider)
      }
    }
  }

  removeColliders(...args) {
    if (args.length < 2)
      return console.error('At least 2 arguments must be supplied')

    for (var i = 0; i < args.length - 1; i++) {
      for (var j = i + 1; j < args.length; j++) {
        if (Game.Plane.prototype.isPrototypeOf(args[i]))
          args[i].colliders.delete(args[j])
        if (Game.Plane.prototype.isPrototypeOf(args[j]))
          args[j].colliders.delete(args[i])
      }
    }
  }

  intersects(obj1, obj2) {
    let bounds1, bounds2;
    if (obj1.constructor === Array)
      bounds1 = {
        x1: obj1[0],
        x2: obj1[2],
        y1: obj1[1],
        y2: obj1[3]
      }
    else if (Game.Plane.prototype.isPrototypeOf(obj1))
      bounds1 = {
        x1: obj1.worldBounds.x1,
        x2: obj1.worldBounds.x2,
        y1: obj1.worldBounds.y1,
        y2: obj1.worldBounds.y2
      }
    else if (obj1.constructor === Object)
      bounds1 = {
        x1: obj1.x1,
        x2: obj1.x2,
        y1: obj1.y1,
        y2: obj1.y2
      }
    if (obj2.constructor === Array)
      bounds2 = {
        x1: obj2[0],
        x2: obj2[2],
        y1: obj2[1],
        y2: obj2[3]
      }
    else if (Game.Plane.prototype.isPrototypeOf(obj2))
      bounds2 = {
        x1: obj2.worldBounds.x1,
        x2: obj2.worldBounds.x2,
        y1: obj2.worldBounds.y1,
        y2: obj2.worldBounds.y2
      }
    else if (obj2.constructor === Object)
      bounds2 = {
        x1: obj2.x1,
        x2: obj2.x2,
        y1: obj2.y1,
        y2: obj2.y2
      }
    return bounds1.x1 < bounds2.x2
        && bounds1.x2 > bounds2.x1
        && bounds1.y1 < bounds2.y2
        && bounds1.y2 > bounds2.y1
  }
}
