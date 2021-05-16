import {Game} from './engine/engine.js'
window.Game = Game

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

window.game = new Game(display)

game.levels.add('forest1', new Game.Level(game, './levels/forest'))
game.levels.forest1.load()

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
			if (!game.keyA) {
				if (!game.objects['character'].flipX) {
					game.objects['character'].flipX = true
				}
				if (game.keyShift) {
					game.controls.move(-0.75, 0)
        } else {
					game.controls.move(-0.32, 0)
				}
			}
			game.keyA = true
			break
		case 'KeyD':
			if (!game.keyD) {
				if (game.objects['character'].flipX) {
					game.objects['character'].flipX = false
				}
        if (game.keyShift) {
					game.controls.move(0.75, 0)
				} else {
					game.controls.move(0.32, 0)
				}
			}
			game.keyD = true
			break
		case 'ShiftLeft':
			if (!game.keyShift) {
				game.controls.move(0, 0)
				if (game.keyA) {
					game.controls.move(-0.75, 0)
				} else if (game.keyD) {
					game.controls.move(0.75, 0)
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
					game.controls.move(!game.objects['character'].flipX ? 0.6 : -0.6, 0)
					game.actions['characterAttack3'].start()
				} else if (!game.keyShift && (game.keyA || game.keyD)) {
					game.controls.move(0, 0)
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
					game.colliders.remove('chest')
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
			game.controls.move(0, 0)
			game.keyA = false
			break
		case 'KeyD':
			game.controls.move(0, 0)
			game.keyD = false
			break
		case 'ShiftLeft':
			if (!game.objects.character.isLocked) {
				if (game.keyA) {
					game.controls.move(-0.32, 0)
				} else if (game.keyD) {
					game.controls.move(0.32, 0)
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
