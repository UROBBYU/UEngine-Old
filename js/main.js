import {Game} from './engine/engine.js'
import backgroundSprite from './sprites/background.js'
import characterSprite from './sprites/character.js'

display.requestFullscreen = display.requestFullscreen || display.mozRequestFullScreen

const game = new Game()

game.addObj('background', backgroundSprite, 1000)
const backSprite = game.sprites.add('background', 'img/Background.jpg')
backSprite.wrapS = THREE.RepeatWrapping
game.uni('background').tex.value = backSprite
game.addObj('character', characterSprite, 100)
game.uni('character').tex.value = game.sprites.add('character', 'img/GraveRobber.png')
game.sprites.add('characterIdle', 'img/GraveRobber_idle.png')
game.sprites.add('characterWalk', 'img/GraveRobber_walk.png')
game.sprites.add('characterRun', 'img/GraveRobber_run.png')
setTimeout(() => {
	game.actions['backgroundWalk'] = new Game.AnimationSlider(30, 0.4, game.objects.background, game.sprites['background'])
	game.actions['backgroundWalkB'] = new Game.AnimationSlider(30, -0.4, game.objects.background, game.sprites['background'])
	game.actions['backgroundRun'] = new Game.AnimationSlider(30, 0.8, game.objects.background, game.sprites['background'])
	game.actions['backgroundRunB'] = new Game.AnimationSlider(30, -0.8, game.objects.background, game.sprites['background'])
	game.actions['characterIdle'] = new Game.AnimationSlideShow(300, 4, 0, 1, game.objects.character, game.sprites['characterIdle'])
	game.actions['characterWalk'] = new Game.AnimationSlideShow(340, 6, 0, 1, game.objects.character, game.sprites['characterWalk'])
	game.actions['characterRun'] = new Game.AnimationSlideShow(170, 6, 0, 1, game.objects.character, game.sprites['characterRun'])
	game.render()
}, 1000)

var isGame = () => document.fullscreenElement

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
				if (!game.uni('character').texFlipX.value) {
					game.uni('character').texFlipX.value = true
					game.uni('character').pos.value.x -= 14
				}
				game.actions['characterIdle'].stop()
				if (keyShift) {
          game.actions['characterRun'].start()
					game.actions['backgroundRunB'].start()
        } else {
          game.actions['characterWalk'].start()
					game.actions['backgroundWalkB'].start()
				}
				keyA = true
			}
			break
		case 'KeyD':
			if (!keyD) {
				if (game.uni('character').texFlipX.value) {
					game.uni('character').texFlipX.value = false
					game.uni('character').pos.value.x += 14
				}
				game.actions['characterIdle'].stop()
        if (keyShift) {
          game.actions['characterRun'].start()
					game.actions['backgroundRun'].start()
				} else {
          game.actions['characterWalk'].start()
					game.actions['backgroundWalk'].start()
				}
				keyD = true
			}
			break
		case 'ShiftLeft':
			if (!keyShift) {
				game.actions['backgroundWalk'].stop()
				game.actions['backgroundWalkB'].stop()
				game.actions['backgroundRun'].stop()
				game.actions['backgroundRunB'].stop()
				if (keyA) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.actions['backgroundRunB'].start()
				} else if (keyD) {
					game.actions['characterWalk'].stop()
	        game.actions['characterRun'].start()
					game.actions['backgroundRun'].start()
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
		case 'KeyA':
			game.actions['characterWalk'].stop()
      game.actions['characterRun'].stop()
			game.actions['backgroundWalkB'].stop()
			game.actions['backgroundRunB'].stop()
      game.actions['characterIdle'].start()
			keyA = false
			break
		case 'KeyD':
      game.actions['characterWalk'].stop()
      game.actions['characterRun'].stop()
			game.actions['backgroundWalk'].stop()
			game.actions['backgroundRun'].stop()
      game.actions['characterIdle'].start()
			keyD = false
			break
		case 'ShiftLeft':
			if (keyA) {
				game.actions['backgroundRunB'].stop()
				game.actions['backgroundWalkB'].start()
				game.actions['characterRun'].stop()
				game.actions['characterWalk'].start()
			} else if (keyD) {
				game.actions['backgroundRun'].stop()
				game.actions['backgroundWalk'].start()
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
});
