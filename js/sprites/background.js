const uniforms = {
	resolution: {
		type: 'v2',
		value: new THREE.Vector2(window.innerWidth, window.innerHeight)
	},
	mouse: {
		type: 'v4',
		value: new THREE.Vector4(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
	},
	step: {
    value: 0
  },
	tex: {
		type:'t',
		value: game.texLoader.load('data:image/bmp;base64,Qk1CAAAAAAAAAD4AAAAoAAAAAQAAAAEAAAABAAEAAAAAAAQAAAAlFgAAJRYAAAAAAAAAAAAAAAAAAP///wAAAAAA')
	}
}

const shader = `
uniform vec2 resolution;
uniform vec4 mouse;
uniform float step;
uniform sampler2D tex;

void main()
{
	vec2 texSize = vec2(textureSize(tex, 0));
	vec2 dim = floor(vec2(
		gl_FragCoord.x / resolution.x * texSize.y + step,
		gl_FragCoord.y / resolution.y * texSize.y
	)) + 0.5;
	float x = dim.x / texSize.x;
	float y = dim.y / texSize.y;
	vec2 cord =  vec2(x, y);
  gl_FragColor = texture2D(tex, cord);
}
`

const material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	fragmentShader: shader
})

const geometry = new THREE.PlaneGeometry(10, 10)

const sprite = new THREE.Mesh(geometry, material)
export default sprite
//game.addObj('background', sprite, 1000)
