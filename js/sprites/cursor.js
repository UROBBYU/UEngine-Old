/*uniforms = {
	resolution: {
		type: 'v2',
		value: new THREE.Vector2(window.innerWidth, window.innerHeight)
	},
	mouse: {
		type: 'v4',
		value: new THREE.Vector4(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2, window.innerHeight / 2)
	},
	isVisible: {
    value: false
	}
}

shader = `
uniform vec2 resolution;
uniform vec4 mouse;
uniform bool isVisible;

void main()
{
    float dist = distance(vec2(mouse.x, resolution.y - mouse.y), gl_FragCoord.xy);
    if (dist < 50. && isVisible)
      gl_FragColor = vec4(1., 0., 0., 1.);
    else
      gl_FragColor = vec4(0., 0., 0., 0.);
}
`

material = new THREE.ShaderMaterial({
  transparent: true,
	uniforms: uniforms,
	fragmentShader: shader
})

geometry = new THREE.PlaneGeometry(10, 10)

sprite = new THREE.Mesh(geometry, material)
game.addObj('cursor', sprite, 1)*/
