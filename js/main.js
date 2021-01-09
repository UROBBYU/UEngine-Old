import {Game} from './engine/engine.js'

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

window.game = new Game()

window.testLevel = new Game.Level(game)

fetch('https://urobbyu.github.io/UEngine/levels/forest.txt').then(res => res.text()).then(text => {
	testLevel.decode(text)
	testLevel.load()
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
