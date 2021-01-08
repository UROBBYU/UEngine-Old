import {Game} from './engine/engine.js'


display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

const game = new Game();

const backgroundSprite = new Game.SpritePlane(0, 0, 1, 1000)

const characterSprite = new Game.SpriteSlideShow(0, 12, 2 / 3, 100)

const chestSprite = new Game.SpriteSwitch(40, 13, 18 / 72, 3, 0, 500)

game.addObj('background', backgroundSprite)
game.addObj('character', characterSprite)
game.addObj('chest', chestSprite)
game.world.camera.target = game.objects['character']
game.sprites.add('background', 'https://urobbyu.github.io/UEngine/img/Background.jpg')
game.sprites.add('character', 'https://urobbyu.github.io/UEngine/img/GraveRobber.png')
game.sprites.add('characterIdle', 'https://urobbyu.github.io/UEngine/img/GraveRobber_idle.png')
game.sprites.add('characterWalk', 'https://urobbyu.github.io/UEngine/img/GraveRobber_walk.png')
game.sprites.add('characterRun', 'https://urobbyu.github.io/UEngine/img/GraveRobber_run.png')
game.sprites.add('chest', 'https://urobbyu.github.io/UEngine/img/Chest.png')
game.loader.wait().then(() => {
	game.objects['background'].texture = game.sprites['background']
	game.objects['character'].texture = game.sprites['character']
	game.objects['chest'].texture = game.sprites['chest']

	game.actions['characterIdle'] = new Game.AnimationSlideShow(300, 4, 0, 1, game.objects['character'], game.sprites['characterIdle'])
	game.actions['characterWalk'] = new Game.AnimationSlideShow(340, 6, 0, 1, game.objects['character'], game.sprites['characterWalk'])
	game.actions['characterRun'] = new Game.AnimationSlideShow(170, 6, 0, 1, game.objects['character'], game.sprites['characterRun'])

	game.actions['chest'] = new Game.Action(() => {
		if (game.objects.chest.position.x < 20 - 3 * game.objects.character.flipX && game.objects.chest.position.x > 0 - 4 * game.objects.character.flipX) {
			game.objects.chest.uniforms.state.value = 1
		} else {
			game.objects.chest.uniforms.state.value = 0
		}
	}, 30)

	game.actions['chest'].start()
	game.actions['characterIdle'].start()
	game.render()
})

var isGame = () => document.fullscreenElement

display.addEventListener('click', e => {
	if (!isGame())
		display.requestFullscreen()
})

/*display.addEventListener('mousedown', e => {
	if (isGame()) {
		// INGAME SHIT
	} else {
		game.mouse.z = e.layerX
		game.mouse.w = e.layerY
	}
})*/

/*window.addEventListener('mousemove', e => {
	if (isGame()) {
		game.mouse.x = e.layerX
		game.mouse.y = e.layerY
	}
})*/

var keyA = false
var keyD = false
var keyShift = false

window.addEventListener('keydown', e => {
	if (isGame()) {
		switch (e.code) {
		case 'KeyA':
			if (!keyA) {
				if (!game.objects['character'].flipX) {
					game.objects['character'].flipX = true
					game.objects['character'].position.x -= 15
				}
				game.actions['characterIdle'].stop()
				if (keyShift) {
          game.actions['characterRun'].start()
					game.world.camera.move(-0.8, 0)
        } else {
          game.actions['characterWalk'].start()
					game.world.camera.move(-0.4, 0)
				}
				keyA = true
			}
			break
		case 'KeyD':
			if (!keyD) {
				if (game.objects['character'].flipX) {
					game.objects['character'].flipX = false
					game.objects['character'].position.x += 15
				}
				game.actions['characterIdle'].stop()
        if (keyShift) {
          game.actions['characterRun'].start()
					game.world.camera.move(0.8, 0)
				} else {
          game.actions['characterWalk'].start()
					game.world.camera.move(0.4, 0)
				}
				keyD = true
			}
			break
		case 'ShiftLeft':
			if (!keyShift) {
				game.world.camera.stop()
				if (keyA) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.world.camera.move(-0.8, 0)
				} else if (keyD) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.world.camera.move(0.8, 0)
				}
				keyShift = true
			}
			break
		}
	}
})

window.addEventListener('keyup', e => {
	if (isGame()) {
		switch (e.code) {
		case 'KeyF':
			if (game.objects.chest.state == 1 && game.objects.chest.step == 0) {
				game.objects.chest.step = 1
			} else if (game.objects.chest.state == 1 && game.objects.chest.step == 1) {
				game.actions['chest'].stop()
				game.objects.chest.state = 0
				game.objects.chest.step = 2
			}
			break
		case 'KeyA':
			game.actions['characterWalk'].stop()
      game.actions['characterRun'].stop()
			game.world.camera.stop()
      game.actions['characterIdle'].start()
			keyA = false
			break
		case 'KeyD':
      game.actions['characterWalk'].stop()
      game.actions['characterRun'].stop()
			game.world.camera.stop()
      game.actions['characterIdle'].start()
			keyD = false
			break
		case 'ShiftLeft':
			if (keyA) {
				game.world.camera.move(-0.4, 0)
				game.actions['characterRun'].stop()
				game.actions['characterWalk'].start()
			} else if (keyD) {
				game.world.camera.move(0.4, 0)
				game.actions['characterRun'].stop()
				game.actions['characterWalk'].start()
			}
			keyShift = false
			break
		}
	}
})

document.addEventListener('fullscreenchange', e => {
  if (document.fullscreenElement) {
		game.isPaused = false
  } else {
		game.isPaused = true
  }
})
