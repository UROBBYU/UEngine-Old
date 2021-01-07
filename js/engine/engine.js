export class Game {
	static Action = class {
		constructor(func, speed) {
			this.run = func
			this.speed = speed
			this.stop()
		}

		start() {
			this.isActive = true
		}

		stop() {
			this.isActive = false
			this.wasActive = false
		}
	}

	static Animation = class extends Game.Action {
		constructor(func, speed, object, texture) {
			super(() => {
				if (object.material.uniforms.tex.value !== this.texture)
					object.material.uniforms.tex.value = this.texture
				func()
			}, speed)
			this.object = object
			this.texture = texture
		}
	}

	static AnimationSlider = class extends Game.Animation {
		constructor(speed, step, object, texture) {
			super(() => {
				object.material.uniforms.step.value += this.step
			}, speed, object, texture)
			this.step = step
		}
	}

	static AnimationSlideShow = class extends Game.Animation {
		constructor(speed, steps, start, step, object, texture) {
			var tex = texture
			if (tex.image.width % step === 0) {
				object.material.uniforms.step.value = start
				super(() => {
					object.material.uniforms.step.value += this.step
					if (object.material.uniforms.step.value < 0)
						object.material.uniforms.step.value = this.steps - 1
					if (object.material.uniforms.step.value >= this.steps)
						object.material.uniforms.step.value = 0
				}, speed, object, tex)
				this.steps = steps
				this.begin = start
				this.step = step
				this.pause = this.stop
				this.stop = () => {
					object.material.uniforms.step.value = this.begin
					this.pause()
				}
			} else {
				console.error(`Invalid argument \'steps\':${steps} for texture:${tex}`)
			}
		}
	}

	constructor() {
		let me = this
		me.scene = new THREE.Scene()
		me.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1000)
		me.renderer = new THREE.WebGLRenderer({
			canvas: display
		})
		me.texLoader = new THREE.TextureLoader()
		me.sprites = {
			add: (name, url) => {
				if (!me.sprites[name])
					return me.texLoader.load(
						url,
						texture => {
							me.sprites[name] = texture
						},
						undefined,
						function (err) {
							console.error('Error occured while loading texture', {name: name, url: url})
						}
					)
				else
					console.error('Cannot add sprite', {name: name})
			},
			remove: name => {
				if (me.sprites[name] && me.sprites[name].constructor === THREE.Texture)
					delete me.sprites[name]
				else
					console.error('Cannot remove sprite', {name: name})
			}
		}
		me.actions = Object.create({},{
			run: {
				get() {
					return (time) => {
						for (let name in me.actions) {
							let anim = me.actions[name]
							if (anim.isActive && ((anim.wasActive && time - anim.last >= anim.speed) || !anim.wasActive)) {
								anim.last = time
								anim.wasActive = true
								anim.run()
							}
						}
					}
				}
			}
		})
		me.isPaused = true
		me.objects = {}
		me.mouse = Object.create({},{
			x: {
				get() {
					let val = Object.entries(me.objects)[0]
					if (val)
						return val[1].material.uniforms.mouse.value.x
					else
						return undefined
				},
				set(val) {
					for (let name in me.objects) {
						me.uni(name).mouse.value.x = val
					}
				}
			},
			y: {
				get() {
					let val = Object.entries(me.objects)[0]
					if (val)
						return val[1].material.uniforms.mouse.value.y
					else
						return undefined
				},
				set(val) {
					for (let name in me.objects) {
						me.uni(name).mouse.value.y = val
					}
				}
			},
			z: {
				get() {
					let val = Object.entries(me.objects)[0]
					if (val)
						return val[1].material.uniforms.mouse.value.z
					else
						return undefined
				},
				set(val) {
					for (let name in me.objects) {
						me.uni(name).mouse.value.z = val
						me.uni(name).mouse.value.x = val
					}
				}
			},
			w: {
				get() {
					let val = Object.entries(me.objects)[0]
					if (val)
						return val[1].material.uniforms.mouse.value.w
					else
						return undefined
				},
				set(val) {
					for (let name in me.objects) {
						me.uni(name).mouse.value.w = val
						me.uni(name).mouse.value.y = val
					}
				}
			},
			visible: {
				get() {
					return me.uni('cursor').isVisible.value
				},
				set(val) {
					me.uni('cursor').isVisible.value = val
				}
			}
		})

		me.addObj = (name, obj, pos) => {
			me.objects[name] = obj
			me.objects[name].position.z = pos
			me.objects[name].flipX = () => {
				me.uni(name).texFlipX.value = !me.uni(name).texFlipX.value
			}
			me.objects[name].flipY = () => {
				me.uni(name).texFlipY.value = !me.uni(name).texFlipY.value
			}
			me.scene.add(obj)
		}

		me.uni = (name) => {
			return me.objects[name].material.uniforms
		}

		me.resize = () => {
			let dim = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth)
			for (let name in me.objects) {
				me.uni(name).resolution.value.x = dim
				me.uni(name).resolution.value.y = dim
			}
			me.renderer.setSize(dim, dim)
		}

		me.render = (time) => {
			me.resize()

			if (!me.isPaused)
				me.actions.run(time)

			me.renderer.render(me.scene, me.camera)
			requestAnimationFrame(me.render)
		}
	}
}
