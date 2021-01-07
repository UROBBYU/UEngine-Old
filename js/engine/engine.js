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
			this.texture = (texture ? texture : object.material.uniforms.tex.value).clone()
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
			var tex = (texture ? texture : object.material.uniforms.tex.value).clone()
			console.log(tex)
			if (tex.image.width % step === 0) {
				object.material.uniforms.step.value = this.start
				super(() => {
					if (object.material.uniforms.step.value < 0)
						object.material.uniforms.step.value = steps - 1
					if (object.material.uniforms.step.value >= steps)
						object.material.uniforms.step.value = 0
					object.material.uniforms.step.value += step
				}, speed, object, tex)
				this.steps = steps
				this.start = start
				this.step = step
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
			}
		})
		me.objects = {}
		/*me.character = {
			faceR: true,
			inter1: -1,
			inter2: -1,
			move(x, y) {
				clearInterval(me.character.inter1)
				clearInterval(me.character.inter2)
				let func1, func2, time1, time2, maxFrame
				if (x === 0) {
					me.uni('character').step.value = 0
					me.uni('character').tex.value = me.sprites.characterIdle
					maxFrame = 4
					func1 = () => {}
					func2 = () => {
						me.uni('character').step.value++
						if (me.uni('character').step.value == maxFrame)
							me.uni('character').step.value = 0
					}
					time1 = 100000
					time2 = 300
				} else if (x > 0) {
					if (!me.character.faceR) {
						me.uni('character').pos.value.x += 14
						me.character.faceR = true
						me.sprites.characterIdle.image.style.transform = ''
						me.sprites.characterWalk.image.style.transform = ''
						me.sprites.characterRun.image.style.transform = ''
					}
					if (x < 10) {
						me.uni('character').tex.value = me.sprites.characterWalk
						maxFrame = 6
					} else {
						me.uni('character').tex.value = me.sprites.characterRun
						maxFrame = 6
					}
					func1 = () => {
						me.uni('background').step.value += 0.12 * (x / 10)
					}
					func2 = () => {
						me.uni('character').step.value++
						if (me.uni('character').step.value == maxFrame)
							me.uni('character').step.value = 0
					}
					time1 = 1
					time2 = 1700 / x
				} else if (x < 0) {
					if (me.character.faceR) {
						me.uni('character').pos.value.x -= 14
						me.character.faceR = false
						me.sprites.characterIdle.image.style.transform = 'scaleX(-1)'
						me.sprites.characterWalk.image.style.transform = 'scaleX(-1)'
						me.sprites.characterRun.image.style.transform = 'scaleX(-1)'
					}
					if (x > -10) {
						me.uni('character').tex.value = me.sprites.characterWalk
						maxFrame = 6
					} else {
						me.uni('character').tex.value = me.sprites.characterRun
						maxFrame = 6
					}
					func1 = () => {
						me.uni('background').step.value += 0.2 * (x / 10)
					}
					func2 = () => {
						me.uni('character').step.value++
						if (me.uni('character').step.value == maxFrame)
							me.uni('character').step.value = 0
					}
					time1 = 1
					time2 = 1700 / -x
				}
				me.character.inter1 = setInterval(func1, time1)
				me.character.inter2 = setInterval(func2, time2)
			}
		}*/
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
			let dim = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth)
			for (let name in me.objects) {
				me.uni(name).resolution.value.x = dim
				me.uni(name).resolution.value.y = dim
			}
			me.renderer.setSize(dim, dim)
		}

		me.render = (time) => {
			me.resize()

			me.actions.run(time)

			me.renderer.render(me.scene, me.camera)
			requestAnimationFrame(me.render)
		}
	}
}
