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
				if (object.texture !== this.texture) {
					object.texture = this.texture
				}
				func()
			}, speed)
			this.object = object
			this.texture = texture
		}
	}

	static AnimationSlider = class extends Game.Animation {
		constructor(speed, step, object, texture) {
			super(() => {
				object.position.x -= this.step
			}, speed, object, texture)
			this.step = step
		}
	}

	static AnimationSlideShow = class extends Game.Animation {
		constructor(speed, steps, start, step, object, texture, sequence, onSeqEnd) {
			var tex = texture
			if (tex.image.width % steps === 0) {
				super(() => {
					object.stepsMax = this.steps
					if (this.sequence) {
						if (this.sequenceIndex < 0) {
							this.stop()
							if (onSeqEnd)
								onSeqEnd(object)
							return
						}
						if (this.sequenceIndex >= this.sequence.length) {
							this.stop()
							if (onSeqEnd)
								onSeqEnd(object)
							return
						}
						object.step = sequence[this.sequenceIndex]
						this.sequenceIndex += this.step
					} else {
						object.step += this.step
						if (object.step < 0)
							object.step = this.steps - 1
						if (object.step >= this.steps)
							object.step = 0
					}
				}, speed, object, tex)
				this.steps = steps
				this.begin = start
				this.step = step
				if (sequence) {
					this.sequence = sequence
					this.sequenceIndex = start
				} else {
					object.step = start
				}
				this.pause = this.stop
				this.stop = () => {
					if (this.sequence)
						this.sequenceIndex = this.begin
					else
						object.step = this.begin
					this.pause()
				}
			} else {
				console.error(`Invalid argument \'steps\':${steps} for texture:${tex}`)
			}
		}
	}

	static Sprite = class {
		constructor(x, y, z) {
			this.uniforms = {
				resolution: {
					value: new THREE.Vector2(window.innerWidth, window.innerHeight)
				},
				pos: {
			    value: new THREE.Vector4(x, y, 0, 0)
			  },
				tex: {
					value: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSIVBTuIOGSoLloQleIoVSyChdJWaNXB5KV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QNzcnRRcp8b6k0CLGC4/3cd49h/fuA4RGhalm1ySgapaRisfEbG5VDLzChwAGMI6oxEw9kV7MwLO+7qmb6i7Cs7z7/qw+JW8ywCcSzzHdsIg3iKObls55nzjESpJCfE48YdAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCY11bSXKc1gjiWkEASImTUUEYFFiK0a6SYSNF5zMM/7PiT5JLJVQYjxwKqUCE5fvA/+D1bszA95SYFY0D3i21/jAKBXaBZt+3vY9tungD+Z+BKa/urDWD2k/R6WwsfAf3bwMV1W5P3gMsdYOhJlwzJkfy0hEIBeD+jb8oBg7dA75o7t9Y5Th+ADM1q+QY4OATGipS97vHuns65/dvTmt8PupRyxKoto9QAAAAGYktHRAD/AJ0AAMbsV1AAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflAQcSCCW2lRjJAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAM5JREFUKM+tkrENwjAQRZ8j6JmAnrhAmcEVYyBmoKOkYwbEGNB4BBSaQE8JDRschePEhyNEwe+SvH/3820YkLwQeSH8ohQcMhX8Q98imfkULueqfzOuFWgmGPUszyoD3bYBwG9sZgyGR4BdGUDWOoZfBqOxmO6nOxhgpw3u0CQtPWr5uYwGKbLpgL/aLkbcGJkRd6BEZ3fD0biDkWPo23m95RP2p7CxMAvd8zeZRdKSd1Z/XefTgX667Pur4G7twc0ScNUeXFbdXt+hCEa9Ab3jSowNnihhAAAAAElFTkSuQmCC')
				},
				texScale: {
					value: new THREE.Vector3(1, 1, 1)
				},
				texFlipX: {
					value: false
				},
				texFlipY: {
					value: false
				}
			}
			this.shaderUniforms = `
uniform vec2 resolution;
uniform vec4 pos;
uniform sampler2D tex;
uniform vec3 texScale;
uniform bool texFlipX;
uniform bool texFlipY;
`
			this.shaderCode = `
vec2 texSize = vec2(textureSize(tex, 0));
vec2 scale = texScale.xy * resolution / texSize * texScale.z;
vec2 scrDim = resolution / scale;
vec2 coord = gl_FragCoord.xy / scale - pos.xy + pos.zw;
coord = floor(coord) + 0.5;
if (texFlipX) coord.x = texSize.x - coord.x - texSize.x + pos.z * 2.;
if (texFlipY) coord.y = texSize.y - coord.y - texSize.y + pos.w * 2.;
coord = coord / texSize;
`
			this.shaderCheck = `
if (coord.x < 0. || coord.x > 1. || coord.y < 0. || coord.y > 1.)
  gl_FragColor = vec4(0., 0., 0., 0.);
else
  gl_FragColor = texture2D(tex, coord);
`
			this.shader = ''
			this.material = new THREE.ShaderMaterial({
				transparent: true,
				uniforms: this.uniforms,
				fragmentShader: this.shader
			})
			this.reshade = () => {
				this.shader = `
${this.shaderUniforms}

void main()
{
	${this.shaderCode}
	${this.shaderCheck}
}
`
			this.material.fragmentShader = this.shader
			}
			this.reshade()
			this.geometry = new THREE.PlaneGeometry(10, 10)
			this.sprite = new THREE.Mesh(this.geometry, this.material)
			this.sprite.position.z = z
		}

		get texture() {
			return this.uniforms.tex.value
		}

		set texture(val) {
			this.uniforms.tex.value = val
			this.scale.x = val.texScale.x
			this.scale.y = val.texScale.y
			this.scale.z = val.texScale.z
			this.position.z = val.anchor.x
			this.position.w = val.anchor.y
		}

		get flipX() {
			return this.uniforms.texFlipX.value
		}

		set flipX(val) {
			this.uniforms.texFlipX.value = val
		}

		get flipY() {
			return this.uniforms.texFlipY.value
		}

		set flipY(val) {
			this.uniforms.texFlipY.value = val
		}

		get zIndex() {
			return this.sprite.position.z
		}

		set zIndex(pos) {
			this.sprite.position.z = pos
		}

		get position() {
			return this.uniforms.pos.value
		}

		set position(val) {
			if (val.constructor === Object) {
				if (val.x)
					this.uniforms.pos.value.x = val.x
				if (val.y)
					this.uniforms.pos.value.y = val.y
				if (val.z)
					this.uniforms.pos.value.z = val.z
				if (val.w)
					this.uniforms.pos.value.w = val.w
			} else if (val.constructor === Array) {
				let [x, y, z, w] = val
				if (x)
					this.uniforms.pos.value.x = x
				if (y)
					this.uniforms.pos.value.y = y
				if (z)
					this.uniforms.pos.value.z = z
				if (w)
					this.uniforms.pos.value.w = w
			} else {
				console.error('Invalid argument: ', val)
			}
		}

		get scale() {
			return this.uniforms.texScale.value
		}

		get bounds() {
			return {
				x1: this.position.x - this.texture.anchor.x,
				x2: this.position.x + this.texture.anchor.x,
				y1: this.position.y - this.texture.anchor.y,
				y2: this.position.y + this.texture.anchor.y
			}
		}
	}

	static SpritePlane = class extends Game.Sprite {
		constructor(x, y, z) {
			super(x, y, z)
			this.material.transparent = false
			this.shaderCheck = `
gl_FragColor = texture2D(tex, coord);
`
			this.reshade()
		}

		set texture(val) {
			val.wrapS = THREE.RepeatWrapping
			val.wrapT = THREE.RepeatWrapping
			this.uniforms.tex.value = val
			this.uniforms.texScale.value = val.texScale
		}
	}

	static SpriteSlideShow = class extends Game.Sprite {
		constructor(x, y, maxSteps, step, z) {
			super(x, y, z)
			this.uniforms.steps = {
				value: maxSteps
			}
			this.uniforms.step = {
				value: step
			}
			this.shaderUniforms = `
				${this.shaderUniforms}
uniform float steps;
uniform float step;
`
			this.shaderCode = `
vec2 texSize = vec2(textureSize(tex, 0));
float stepSize = texSize.x / steps;
vec2 scale = texScale.xy * resolution / vec2(stepSize, texSize.y) * vec2(texScale.z * stepSize / texSize.y, texScale.z);
vec2 scrDim = resolution / scale;
vec2 coord = gl_FragCoord.xy / scale - pos.xy + pos.zw;
coord = floor(coord) + 0.5;
if (texFlipX) coord.x = stepSize - coord.x - stepSize + pos.z * 2.;
if (texFlipY) coord.y = texSize.y - coord.y - texSize.y + pos.w * 2.;
coord.x = (coord.x + stepSize * step) / texSize.x;
coord.y = coord.y / texSize.y;
`
			this.shaderCheck = `
if (coord.x < (stepSize * step) / texSize.x || coord.x > (stepSize * (step + 1.)) / texSize.x || coord.y < 0. || coord.y > 1.)
  gl_FragColor = vec4(0., 0., 0., 0.);
else
  gl_FragColor = texture2D(tex, coord);
`
			this.reshade()
		}

		get stepsMax() {
			return this.uniforms.steps.value
		}

		set stepsMax(value) {
			this.uniforms.steps.value = value
		}

		get step() {
			return this.uniforms.step.value
		}

		set step(value) {
			this.uniforms.step.value = value
		}
	}

	static SpriteSwitch = class extends Game.SpriteSlideShow {
		constructor(x, y, maxSteps, step, z) {
			super(x, y, maxSteps, step, z)
			this.uniforms.state = {
				value: 0
			}
			this.shaderUniforms = `
${this.shaderUniforms}
uniform int state; // 0 - Inactive, 1 - Active
`
			this.shaderCheck = `
if (coord.x < (stepSize * step) / texSize.x || coord.x > (stepSize * (step + 1.)) / texSize.x || coord.y < 0. || coord.y > 1.)
	gl_FragColor = vec4(0., 0., 0., 0.);
else {
	vec4 pixel = texture2D(tex, coord);
	if (pixel.a == 0.
		&& ((texture2D(tex, vec2(coord.x + 1. / texSize.x, coord.y)).a != 0.)
		|| (texture2D(tex, vec2(coord.x - 1. / texSize.x, coord.y)).a != 0.)
		|| (texture2D(tex, vec2(coord.x, coord.y + 1. / texSize.y)).a != 0.)
		|| (texture2D(tex, vec2(coord.x, coord.y - 1. / texSize.y)).a != 0.)))
		if (state == 1) {
			pixel = vec4(1., 0.964, 0.859, 1.);
		}
  gl_FragColor = pixel;
}
`
		this.reshade()
		}

		get state() {
			return this.uniforms.state.value
		}

		set state(value) {
			this.uniforms.state.value = value
		}
	}

	static Level = class {
		static encode = str => {
			return encodeURI(unescape(btoa(str)))
		}

		constructor(gameObject, link, devMode) {
			if (gameObject.constructor === Game) {
				this.data = {
					gameObject: gameObject,
					origin: link,
					state: false,
					devMode: devMode
				}
				this.load = () => {
					if (!this.data.state) {
						const handle = tmp => {
							if (!tmp) {
								console.error('Invalid data in Level', this)
								return
							}
							Object.assign(this.data, tmp)
							this.data.gameObject.loader.loadTextures(this.data.textures).then(() => {
								this.data.objects = new Function('gameObj', this.data.objects)
								this.data.objects = this.data.objects(this.data.gameObject)
								for (let obj in this.data.objects)
									this.data.gameObject.objects.add(obj, this.data.objects[obj])
								this.data.actions = new Function('gameObj', this.data.actions)
								this.data.actions = this.data.actions(this.data.gameObject)
								Object.assign(this.data.gameObject.actions, this.data.actions)
								this.data.postLoad(this.data.gameObject)
								const data = {
									textures: [],
									objects: [],
									actions: []
								}
								Object.entries(this.data.textures).forEach(key => {
									data.textures.push(key[0])
								})
								Object.entries(this.data.objects).forEach(key => {
									data.objects.push(key[0])
								})
								Object.entries(this.data.actions).forEach(key => {
									data.actions.push(key[0])
								})
								Object.assign(this.data, data)
							})
							if (!this.data.devMode)
								tmp = undefined
						}
						if (this.data.devMode)
							handle(this.data.origin)
						else
							fetch(this.data.origin).then(res => res.text()).then(text => {
								var tmp = new Function(decodeURIComponent(escape(window.atob(text))))
								tmp = tmp()
								handle(tmp)
							})
						this.data.state = true
					} else {
						console.error('Level is already loaded')
					}
				}
				this.unload = () => {
					if (this.data.state) {
						this.data.actions.forEach(key => {
							delete this.data.gameObject.actions[key]
						})
						this.data.objects.forEach(key => {
							this.data.gameObject.objects.remove(key)
						})
						this.data.textures.forEach(key => {
							this.data.gameObject.sprites.remove(key)
						})
						delete this.data.textures
						delete this.data.objects
						delete this.data.actions
						delete this.data.state
						delete this.data.postLoad
					} else {
						console.error('Level is not loaded')
					}
				}
			} else
				console.error('Invalid argument', gameObject)
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
		me.loader = {
			toLoad: 0,
			wait: () => {
				if (!me.loader.cur) {
					me.loader.cur = new Promise((res, rej) => {
						var inter = setInterval(() => {
							if (me.loader.toLoad === 0) {
								clearInterval(inter)
								me.loader.toLoad = 0
								delete me.loader.cur
								res()
							} else if (me.loader.toLoad < 0) {
								clearInterval(inter)
								me.loader.toLoad = 0
								delete me.loader.cur
								rej()
							}
						}, 50)
					})
				}
				return me.loader.cur
			},
			loadTextures: tex => {
				if (tex.constructor === Object) {
					for (let key in tex) {
						if (tex[key].constructor === Object) {
							me.sprites.add(key, tex[key].file, tex[key].anchor, tex[key].scale)
						} else if (tex[key].constructor === String) {
							me.sprites.add(key, tex[key])
						} else
							console.error('Invalid argument: ', tex)
					}
					return me.loader.wait()
				} else if (tex.constructor === Array) {
					tex.forEach(val => {
						if (val[1].constructor === Object) {
							me.sprites.add(val[0], val[1].file, val[1].scale)
						} else if (val[1].constructor === Array) {
							me.sprites.add(val[0], val[1][0], val[1][1])
						} else if (val.constructor === String) {
							me.sprites.add(key, val)
						} else
							console.error('Invalid argument: ', tex)
					})
					return me.loader.wait()
				} else
					console.error('Invalid argument: ', tex)
			}
		}
		me.sprites = Object.create({},{
			add: {
				get() {
					return (name, file, anchor, scale) => {
						if (!me.sprites[name]) {
							me.loader.toLoad++
							me.texLoader.load(
								file,
								texture => {
									me.loader.toLoad--
									if (anchor) {
										if (anchor.constructor === Object) {
											texture.anchor = {
												x: anchor.x ? anchor.x : 0,
												y: anchor.y ? anchor.y : 0
											}
										} else if (anchor.constructor === Array) {
											texture.anchor = {
												x: anchor[0] ? anchor[0] : 0,
												y: anchor[1] ? anchor[1] : 0
											}
										} else
											console.error('Invalid argument: ', {name: name, file: file, anchor: anchor, scale: scale})
										if (scale) {
											if (scale.constructor === Object) {
												texture.texScale = {
													x: scale.x ? scale.x : 1,
													y: scale.y ? scale.y : 1,
													z: scale.z ? scale.z : 1
												}
											} else if (scale.constructor === Array) {
												texture.texScale = {
													x: scale[0] ? scale[0] : 1,
													y: scale[1] ? scale[1] : 1,
													z: scale[2] ? scale[2] : 1
												}
											} else if (scale.constructor === Number) {
												texture.texScale = {
													x: 1,
													y: 1,
													z: scale
												}
											} else
												console.error('Invalid argument: ', {name: name, file: file, anchor: anchor, scale: scale})
										} else
											texture.texScale = {
												x: 1,
												y: 1,
												z: 1
											}
										} else {
											texture.anchor = {
												x: 0,
												y: 0
											}
											texture.texScale = {
												x: 1,
												y: 1,
												z: scale
											}
										}
										me.sprites[name] = texture
								},
								undefined,
								function (err) {
									me.loader.toLoad = Number.NEGATIVE_INFINITY
									console.error('Error occured while loading texture', {name: name, file: file, scale: scale})
								}
							)
						} else
							console.error('Cannot add sprite', {name: name})
					}
				}
			},
			remove: {
				get() {
					return name => {
						if (me.sprites[name] && THREE.Texture.prototype.isPrototypeOf(me.sprites[name]))
							delete me.sprites[name]
						else
							console.error('Cannot remove sprite', {name: name})
					}
				}
			}
		})
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
					return (name, action) => {
						if (!me.actions[name])
							me.actions[name] = action
						else
							console.error('Cannot add action', {name: name, action: action})
					}
				}
			},
			remove: {
				get() {
					return name => {
						if (me.actions[name] && Game.Action.prototype.isPrototypeOf(me.actions[name]))
							delete me.actions[name]
						else
							console.error('Cannot remove action', {name: name})
					}
				}
			}
		})
		me.isPaused = true
		me.pause = () => {
			return new Promise((res, rej) => {
				me.isPauseConfirmed = false
				me.isPaused = true
				let inter = setInterval(() => {
					if (me.isPauseConfirmed) {
						me.loader.wait().then(() => {
							delete me.isPauseConfirmed
							res()
						})
					}
				}, 50)
			})
		}
		me.break = () => {
			return new Promise((res, rej) => {
				me.pause().then(() => {
					me.hardStop = true
					let inter = setInterval(() => {
						if (me.isBreakConfirmed) {
							res()
						}
					}, 50)
				})
			})
		}
		me.resume = () => {
			delete me.hardStop
			me.isPaused = false
		}
		me.objects = Object.create({},{
			add: {
				get() {
					return (name, obj) => {
						if (!me.objects[name]) {
							me.objects[name] = obj
							me.scene.add(obj.sprite)
						} else
							console.error('Cannot add object', {name: name, object: obj})
					}
				}
			},
			remove: {
				get() {
					return name => {
						if (me.objects[name] && Game.Sprite.prototype.isPrototypeOf(me.objects[name])) {
							me.scene.remove(me.objects[name].sprite)
							delete me.objects[name]
						} else
							console.error('Cannot remove object', {name: name})
					}
				}
			}
		})
		me.levels = Object.create({},{
			add: {
				get() {
					return (name, level) => {
						if (!me.levels[name])
							me.levels[name] = level
						else
							console.error('Cannot add level', {name: name, level: level})
					}
				}
			},
			remove: {
				get() {
					return name => {
						if (me.levels[name] && me.levels[name].constructor === Game.Level) {
							if (me.levels[name].data.state === true)
								me.levels[name].unload()
							delete me.objects[name]
						} else
							console.error('Cannot remove level', {name: name})
					}
				}
			}
		})
		me.actions['cameraMove'] = new Game.Action(() => {
			me.world.camera.position.x += me.world.camera.speed.x
			me.world.camera.position.y += me.world.camera.speed.y
			for (let name in me.objects) {
				let obj = me.objects[name]
				if (obj !== me.world.camera.target) {
					obj.position.x -= me.world.camera.speed.x
					obj.position.y -= me.world.camera.speed.y
				}
			}
		}, 15)
		me.world = {
			camera: {
				position: {
					x: 0,
					y: 0
				},
				speed: {
					x: 0,
					y: 0
				},
				move: (x, y) => {
					me.world.camera.speed.x = x
					me.world.camera.speed.y = y
					me.actions['cameraMove'].start()
				},
				stop: () => {
					me.world.camera.speed.x = 0
					me.world.camera.speed.y = 0
					me.actions['cameraMove'].stop()
				}
			}
		}
		me.colliders = Object.create({},{
			add: {
				get() {
					return (func, obj1, obj2) => {

					}
				}
			}
		})
		/*me.mouse = Object.create({},{
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
		})*/

		me.uni = (name) => {
			return me.objects[name].uniforms
		}

		me.resize = () => {
			let dim = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth)
			if (!me.isPaused)
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
			else
				me.isPauseConfirmed = true

			me.renderer.render(me.scene, me.camera)
			if (!me.hardStop)
				requestAnimationFrame(me.render)
			else {
				me.isBreakConfirmed = true
			}
		}
	}
}
