uniforms = {
	resolution: {
		type: 'v2',
		value: new THREE.Vector2(window.innerWidth, window.innerHeight)
	},
	mouse: {
		type: 'v4',
		value: new THREE.Vector4(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
	},
  pos: {
    type: 'v2',
    value: new THREE.Vector2(0, 12)
  },
  step: {
    type: 'f',
    value: 0
  },
	tex: {
		type:'t',
		value: new THREE.TextureLoader().load('data:image/bmp;base64,Qk1CAAAAAAAAAD4AAAAoAAAAAQAAAAEAAAABAAEAAAAAAAQAAAAlFgAAJRYAAAAAAAAAAAAAAAAAAP///wAAAAAA')
	},
	texFlipX: {
		value: false
	},
	texFlipY: {
		value: false
	}
}

shader = `
uniform vec2 resolution;
uniform vec4 mouse;
uniform vec2 pos;
uniform float step;
uniform sampler2D tex;
uniform bool texFlipX;
uniform bool texFlipY;

void main()
{
	float imageSize = 1.5;
  vec2 texSize = vec2(textureSize(tex, 0));
  float resDim = texSize.y / texSize.x;
  vec2 dim = floor(gl_FragCoord.xy / resolution.xy * texSize.y * imageSize) + 0.5;
  dim.x += step * texSize.y;
  float x = (dim.x - pos.x) / texSize.x;
  float y = (dim.y - pos.y) / texSize.y;
  vec2 cord = vec2(x, y);
  if (x < resDim * (step + 1.) && x > resDim * (step) && y < 1. && y > 0.) {
		if (texFlipX)
			cord.x = (2. * step + 1.) * resDim - cord.x;
		if (texFlipY)
			cord.y = 1. - cord.y;
		gl_FragColor = texture2D(tex, cord);
  } else {
    gl_FragColor = vec4(0., 0., 0., 0.);
  }
}
`

material = new THREE.ShaderMaterial({
  transparent: true,
	uniforms: uniforms,
	fragmentShader: shader
})

geometry = new THREE.PlaneGeometry(10, 10)

const characterSprite = new THREE.Mesh(geometry, material)
export default characterSprite
