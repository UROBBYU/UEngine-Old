import {Game} from './engine/engine.js'
window.Game = Game

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

window.game = new Game()

game.levels.add('forest1', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest1.txt'))
game.levels.add('forest2', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest2.txt'))
game.levels.add('forest3', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest3.txt'))
game.levels.add('forest4', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest4.txt'))

game.levels['forest1'].load()

game.render()

display.addEventListener('click', e => {
	if (game.isPaused)
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
	if (!game.isPaused) {
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
	if (!game.isPaused) {
		switch (e.code) {
		case 'KeyF':
			if (game.objects.chest.state == 1 && game.objects.chest.step == 0) {
				game.objects.chest.step = 1
			} else if (game.objects.chest.state == 1 && game.objects.chest.step == 1) {
				game.actions['chest'].stop()
				game.objects.chest.state = 0
				game.objects.chest.step = 2
			}
			if (game.objects.teleport_keyboard.state == 1) {
				game.objects.teleport_portal.portal.ready = false
				game.actions.teleport_portalChange.start()
				let arrTypes = Object.entries(game.objects.teleport_portal.portal.types)
				let index
				for (var i = 0; i < arrTypes.length; i++) {
					if (arrTypes[i][0] === game.objects.teleport_portal.portal.cur) {
						index = i
						break
					}
				}
				index++
				if (index >= arrTypes.length)
					index = 0
				game.objects.teleport_portal.portal.cur = arrTypes[index][0]
				game.objects.teleport_gems.step = arrTypes[index][1]
			}
			if (game.objects.teleport_portal.step === 5 + game.objects.teleport_portal.portal.types[game.objects.teleport_portal.portal.cur] * 4) {
				game.pause().then(() => {
					let newLevel = game.objects.teleport_portal.portal.cur
					for (let name in game.levels)
						if (game.levels[name].data.state)
							game.levels[name].unload()
						game.levels[newLevel].load()
						game.loader.wait().then(() => {
							game.resume()
					})
				})
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
		game.resume()
  } else {
		game.pause()
  }
})
