import {Game} from './engine/engine.js'
window.Game = Game

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

window.game = new Game()

game.levels.add('forest1', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest1.txt'))
game.levels.forest1.load()
/*game.levels.add('forest2', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest2.txt'))
game.levels.add('forest3', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest3.txt'))
game.levels.add('forest4', new Game.Level(game, 'https://urobbyu.github.io/UEngine/levels/forest4.txt'))*/

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

game.keyA = false
game.keyD = false
game.keyShift = false

window.addEventListener('keydown', e => {
	if (!game.isPaused) {
		switch (e.code) {
		case 'KeyA':
			if (!game.keyA && !game.objects.character.isLocked) {
				if (!game.objects['character'].flipX) {
					game.objects['character'].flipX = true
				}
				game.actions['characterIdle'].stop()
				if (game.keyShift) {
          game.actions['characterRun'].start()
					game.world.camera.move(-0.75, 0)
        } else {
          game.actions['characterWalk'].start()
					game.world.camera.move(-0.32, 0)
				}
			}
			game.keyA = true
			break
		case 'KeyD':
			if (!game.keyD && !game.objects.character.isLocked) {
				if (game.objects['character'].flipX) {
					game.objects['character'].flipX = false
				}
				game.actions['characterIdle'].stop()
        if (game.keyShift) {
          game.actions['characterRun'].start()
					game.world.camera.move(0.75, 0)
				} else {
          game.actions['characterWalk'].start()
					game.world.camera.move(0.32, 0)
				}
			}
			game.keyD = true
			break
		case 'ShiftLeft':
			if (!game.keyShift && !game.objects.character.isLocked) {
				game.world.camera.stop()
				if (game.keyA) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.world.camera.move(-0.75, 0)
				} else if (game.keyD) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.world.camera.move(0.75, 0)
				}
			}
			game.keyShift = true
			break
		}
	}
})

window.addEventListener('keyup', e => {
	if (!game.isPaused) {
		switch (e.code) {
		case 'KeyE':
			if (!game.objects.character.isLocked) {
				game.objects.character.isLocked = true
				game.actions['characterWalk'].stop()
				game.actions['characterRun'].stop()
				game.actions['characterIdle'].stop()
				if (game.keyShift && (game.keyA || game.keyD)) {
					game.world.camera.speed.x = !game.objects['character'].flipX ? 0.6 : -0.6
					game.actions['characterAttack3'].start()
				} else if (!game.keyShift && (game.keyA || game.keyD)) {
					game.world.camera.speed.x = 0
					game.actions['characterAttack1'].start()
				} else
					game.actions['characterAttack2'].start()
			}
			break
		case 'KeyF':
			if (!game.objects.character.isLocked) {
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
			}
			break
		case 'KeyA':
			if (!game.objects.character.isLocked) {
				game.actions['characterWalk'].stop()
      	game.actions['characterRun'].stop()
				game.world.camera.stop()
      	game.actions['characterIdle'].start()
			}
			game.keyA = false
			break
		case 'KeyD':
			if (!game.objects.character.isLocked) {
      	game.actions['characterWalk'].stop()
      	game.actions['characterRun'].stop()
				game.world.camera.stop()
      	game.actions['characterIdle'].start()
			}
			game.keyD = false
			break
		case 'ShiftLeft':
			if (!game.objects.character.isLocked) {
				if (game.keyA) {
					game.world.camera.move(-0.32, 0)
					game.actions['characterRun'].stop()
					game.actions['characterWalk'].start()
				} else if (game.keyD) {
					game.world.camera.move(0.32, 0)
					game.actions['characterRun'].stop()
					game.actions['characterWalk'].start()
				}
			}
			game.keyShift = false
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
