import Game from './engine/engine.js'
import {sprite as backgroundSprite} from './sprites/background.js'
import {sprite as characterSprite} from './sprites/character.js'

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

/*var isGame = () => document.fullscreenElement

display.addEventListener('click', e => {
	if (!isGame())
		display.requestFullscreen()
})

display.addEventListener('mousedown', e => {
	if (isGame()) {
		// INGAME SHIT
	} else {
		game.mouse.z = e.layerX
		game.mouse.w = e.layerY
	}
})

window.addEventListener('mousemove', e => {
	if (isGame()) {
		game.mouse.x = e.layerX
		game.mouse.y = e.layerY
	}
})

var keyA = false
var keyD = false
var keyShift = false

window.addEventListener('keydown', e => {
	if (isGame()) {
		switch (e.code) {
		case 'KeyA':
			if (!keyA) {
				game.character.move(-5 * (keyShift ? 2 : 1), 0)
				keyA = true
			}
			break
		case 'KeyD':
			if (!keyD) {
				game.character.move(5 * (keyShift ? 2 : 1), 0)
				keyD = true
			}
			break
		case 'ShiftLeft':
			if (!keyShift) {
				if (keyD)
					game.character.move(10, 0)
				else if (keyA)
					game.character.move(-10, 0)
				keyShift = true
			}
			break
		}
	}
})

window.addEventListener('keyup', e => {
	if (isGame()) {
		switch (e.code) {
		case 'KeyA':
			game.character.move(0, 0)
			keyA = false
			break
		case 'KeyD':
			game.character.move(0, 0)
			keyD = false
			break
		case 'ShiftLeft':
			if (keyD)
				game.character.move(5, 0)
			else if (keyA)
				game.character.move(-5, 0)
			keyShift = false
			break
		}
	}
})
// game.uni('background').pos.value += 0.5

document.addEventListener('fullscreenchange', e => {
  /*if (document.fullscreenElement) {
		game.mouse.visible = true
  } else {
		game.mouse.visible = false
  }
});*/
