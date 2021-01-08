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
				if (object.texture !== this.texture)
					object.texture = this.texture
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
		constructor(speed, steps, start, step, object, texture) {
			var tex = texture
			if (tex.image.width % step === 0) {
				object.step = start
				super(() => {
					object.stepsMax = this.steps
					object.step += this.step
					if (object.step < 0)
						object.step = this.steps - 1
					if (object.step >= this.steps)
						object.step = 0
				}, speed, object, tex)
				this.steps = steps
				this.begin = start
				this.step = step
				this.pause = this.stop
				this.stop = () => {
					object.step = this.begin
					this.pause()
				}
			} else {
				console.error(`Invalid argument \'steps\':${steps} for texture:${tex}`)
			}
		}
	}

	static Sprite = class {
		constructor(x, y, scale, z) {
			this.uniforms = {
				resolution: {
					type: 'v2',
					value: new THREE.Vector2(window.innerWidth, window.innerHeight)
				},
				pos: {
			    type: 'v2',
			    value: new THREE.Vector2(x, y)
			  },
				tex: {
					type: 't',
					value: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSIVBTuIOGSoLloQleIoVSyChdJWaNXB5KV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QNzcnRRcp8b6k0CLGC4/3cd49h/fuA4RGhalm1ySgapaRisfEbG5VDLzChwAGMI6oxEw9kV7MwLO+7qmb6i7Cs7z7/qw+JW8ywCcSzzHdsIg3iKObls55nzjESpJCfE48YdAFiR+5Lrv8xrnosMAzQ0YmNU8cIhaLHSx3MCsZKvEMcVhRNcoXsi4rnLc4q5Uaa92TvzCY11bSXKc1gjiWkEASImTUUEYFFiK0a6SYSNF5zMM/7PiT5JLJVQYjxwKqUCE5fvA/+D1bszA95SYFY0D3i21/jAKBXaBZt+3vY9tungD+Z+BKa/urDWD2k/R6WwsfAf3bwMV1W5P3gMsdYOhJlwzJkfy0hEIBeD+jb8oBg7dA75o7t9Y5Th+ADM1q+QY4OATGipS97vHuns65/dvTmt8PupRyxKoto9QAAAAGYktHRAD/AJ0AAMbsV1AAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflAQcSCCW2lRjJAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAM5JREFUKM+tkrENwjAQRZ8j6JmAnrhAmcEVYyBmoKOkYwbEGNB4BBSaQE8JDRschePEhyNEwe+SvH/3820YkLwQeSH8ohQcMhX8Q98imfkULueqfzOuFWgmGPUszyoD3bYBwG9sZgyGR4BdGUDWOoZfBqOxmO6nOxhgpw3u0CQtPWr5uYwGKbLpgL/aLkbcGJkRd6BEZ3fD0biDkWPo23m95RP2p7CxMAvd8zeZRdKSd1Z/XefTgX667Pur4G7twc0ScNUeXFbdXt+hCEa9Ab3jSowNnihhAAAAAElFTkSuQmCC')
				},
				texScale: {
					type: 'v4',
			    value: new THREE.Vector4(1, 1, scale, 1)
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
uniform vec2 pos;
uniform sampler2D tex;
uniform vec4 texScale;
uniform bool texFlipX;
uniform bool texFlipY;
`
			this.shaderCode = `
vec2 texSize = vec2(textureSize(tex, 0));
vec2 scale = texScale.xy * texScale.z * texScale.w;
vec2 scrDim = resolution / scale;
vec2 coord = gl_FragCoord.xy / scale - pos;
coord = floor(coord) + 0.5;
if (texFlipX) coord.x = texSize.x - coord.x;
if (texFlipY) coord.y = texSize.y - coord.y;
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
			} else if (val.constructor === Array) {
				let [x, y] = val
				if (x)
					this.uniforms.pos.value.x = x
				if (y)
					this.uniforms.pos.value.y = y
			} else {
				console.error('Invalid argument: ', val)
			}
		}

		get scale() {
			return this.uniforms.texScale.value
		}
	}

	static SpritePlane = class extends Game.Sprite {
		constructor(x, y, scale, z) {
			super(x, y, scale, z)
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
		}
	}

	static SpriteSlideShow = class extends Game.Sprite {
		constructor(x, y, scale, z) {
			super(x, y, scale, z)
			this.uniforms.steps = {
				value: 1
			}
			this.uniforms.step = {
				value: 0
			}
			this.shaderUniforms = `
				${this.shaderUniforms}
uniform float steps;
uniform float step;
`
			this.shaderCode = `
vec2 texSize = vec2(textureSize(tex, 0));
vec2 scale = texScale.xy * texScale.z * texScale.w;
vec2 scrDim = resolution / scale;
vec2 coord = gl_FragCoord.xy / scale - pos;
coord = floor(coord) + 0.5;
float stepSize = texSize.x / steps;
if (texFlipX) coord.x = stepSize - coord.x;
if (texFlipY) coord.y = stepSize - coord.y;
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
		constructor(x, y, scale, maxStates, state, z) {
			super(x, y, scale, z)
			this.stepsMax = maxStates
			this.step = state
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
		} else {
			pixel = vec4(0., 0., 0., 1.);
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
				return new Promise((res, rej) => {
					var inter = setInterval(() => {
						if (me.loader.toLoad === 0) {
							clearInterval(inter)
							me.loader.toLoad = 0
							res()
						} else if (me.loader.toLoad < 0) {
							clearInterval(inter)
							me.loader.toLoad = 0
							rej()
						}
					}, 50)
				})
			}
		}
		me.sprites = {
			add: (name, url) => {
				if (!me.sprites[name]) {
					me.loader.toLoad++
					return me.texLoader.load(
						url,
						texture => {
							me.loader.toLoad--
							me.sprites[name] = texture
						},
						undefined,
						function (err) {
							me.loader.toLoad = Number.NEGATIVE_INFINITY
							console.error('Error occured while loading texture', {name: name, url: url})
						}
					)
				} else
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
		}, 30)
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

		me.addObj = (name, obj) => {
			me.objects[name] = obj
			me.scene.add(obj.sprite)
		}

		me.uni = (name) => {
			return me.objects[name].uniforms
		}

		me.resize = () => {
			let dim = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth)
			for (let name in me.objects) {
				me.uni(name).resolution.value.x = dim
				me.uni(name).resolution.value.y = dim
				me.objects[name].scale.w = window.innerHeight / me.uni(name).tex.value.image.naturalHeight
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
