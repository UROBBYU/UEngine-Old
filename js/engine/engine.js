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
			this.object = object
			this.texture = texture
			validateTexture(object, texture)
			super(() => {
				if (object.material.uniforms.tex.value !== this.texture)
					object.material.uniforms.tex.value = this.texture
				func()
			}, speed)
		}

		validateTexture(object, texture) {
			if (this.texture)
				object.material.uniforms.tex.value = this.texture
			else
				this.texture = object.material.uniforms.tex.value
		}
	}

	static AnimationSlider = class extends Game.Animation {
		constructor(speed, step, object, texture) {
			this.step = step
			super(() => {
				object.material.uniforms.step.value += this.step
			}, speed, object, texture)
		}
	}

	static AnimationSlideShow = class extends Game.Animation {
		constructor(speed, steps, start, step, object, texture) {
			this.steps = steps
			this.start = start
			this.step = step
			validateTexture(object, texture)
			if (this.texture.image.width % step === 0) {
				object.material.uniforms.step.value = this.start
				super(() => {
					if (object.material.uniforms.step.value < 0)
						object.material.uniforms.step.value = steps - 1
					if (object.material.uniforms.step.value >= steps)
						object.material.uniforms.step.value = 0
					object.material.uniforms.step.value += step
				}, speed, object, texture)
				this.pause = this.stop
				this.stop = () => {
					object.material.uniforms.step.value = this.start
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
			},
			add: {
				get() {
					return (name, speed, func) => {
						if (!me.actions[name])
							me.actions[name] = new Game.Action(func, speed)
						else
							console.error('Cannot add animation', {name: name, speed: speed, func: func})
					}
				}
			},
			remove: {
				get() {
					return name => {
						if (me.actions[name] && me.actions[name].constructor === Game.Action)
							delete me.actions[name]
						else
							console.error('Cannot remove animation', {name: name})
					}
				}
			}
		})
		me.objects = {}
		me.character = {
			faceR: true,
			inter1: -1,
			inter2: -1,
			move(x, y) {
				clearInterval(me.character.inter1)
				clearInterval(me.character.inter2)
				let func1, func2, time1, time2, maxFrame
				if (x === 0) {
					me.uni('character').sprt.value = 0
					me.uni('character').tex.value = me.sprites.characterIdle
					maxFrame = 4
					func1 = () => {}
					func2 = () => {
						me.uni('character').sprt.value++
						if (me.uni('character').sprt.value == maxFrame)
							me.uni('character').sprt.value = 0
					}
					time1 = 100000
					time2 = 300
				} else if (x > 0) {
					if (!me.character.faceR) {
						me.uni('character').pos.value.x += 14
						me.character.faceR = true
						me.sprites.characterIdle.flipY = false
						me.sprites.characterRun.flipY = false
						me.sprites.characterWalk.flipY = false
					}
					if (x < 10) {
						me.uni('character').tex.value = me.sprites.characterWalk
						maxFrame = 6
					} else {
						me.uni('character').tex.value = me.sprites.characterRun
						maxFrame = 6
					}
					func1 = () => {
						me.uni('background').pos.value += 0.12 * (x / 10)
					}
					func2 = () => {
						me.uni('character').sprt.value++
						if (me.uni('character').sprt.value == maxFrame)
							me.uni('character').sprt.value = 0
					}
					time1 = 1
					time2 = 1700 / x
				} else if (x < 0) {
					if (me.character.faceR) {
						me.uni('character').pos.value.x -= 14
						me.character.faceR = false
						me.sprites.characterIdle.flipY = true
						me.sprites.characterRun.flipY = true
						me.sprites.characterWalk.flipY = true
					}
					if (x > -10) {
						me.uni('character').tex.value = me.sprites.characterWalk
						maxFrame = 6
					} else {
						me.uni('character').tex.value = me.sprites.characterRun
						maxFrame = 6
					}
					func1 = () => {
						me.uni('background').pos.value += 0.2 * (x / 10)
					}
					func2 = () => {
						me.uni('character').sprt.value++
						if (me.uni('character').sprt.value == maxFrame)
							me.uni('character').sprt.value = 0
					}
					time1 = 1
					time2 = 1700 / -x
				}
				me.character.inter1 = setInterval(func1, time1)
				me.character.inter2 = setInterval(func2, time2)
			}
		}
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
			me.scene.add(obj)
		}

		me.uni = (name) => {
			return me.objects[name].material.uniforms
		}

		me.resize = () => {
			for (let name in me.objects) {
				me.uni(name).resolution.value.x = window.innerWidth
				me.uni(name).resolution.value.y = window.innerHeight
			}
			me.renderer.setSize(window.innerWidth, window.innerHeight)
		}

		me.render = (time) => {
			me.resize()

			me.actions.run(time)

			me.renderer.render(me.scene, me.camera)
			requestAnimationFrame(me.render)
		}
	}
}