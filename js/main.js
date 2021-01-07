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
game.sprites.add('characterRun', 'img/GraveRobber_run.png')
game.sprites.add('characterWalk', 'img/GraveRobber_walk.png')
game.actions['characterIdle'] = new Game.AnimationSlideShow(300, 4, 0, 1, game.objects.character, game.sprites['characterIdle'])
game.actions['characterWalk'] = new Game.AnimationSlideShow(340, 6, 0, 1, game.objects.character, game.sprites['characterWalk'])
game.actions['characterRun'] = new Game.AnimationSlideShow(170, 6, 0, 1, game.objects.character, game.sprites['characterRun'])
game.sprites['characterIdle'].image.style.transform = 'scaleX(-1)'
game.actions['characterIdleB'] = new Game.AnimationSlideShow(300, 4, 0, 1, game.objects.character, game.sprites['characterIdle'])
game.sprites['characterIdle'].image.style.transform = ''
game.sprites['characterWalk'].image.style.transform = 'scaleX(-1)'
game.actions['characterWalkB'] = new Game.AnimationSlideShow(340, 6, 0, 1, game.objects.character, game.sprites['characterWalk'])
game.sprites['characterWalk'].image.style.transform = ''
game.sprites['characterRun'].image.style.transform = 'scaleX(-1)'
game.actions['characterRunB'] = new Game.AnimationSlideShow(170, 6, 0, 1, game.objects.character, game.sprites['characterRun'])
game.sprites['characterRun'].image.style.transform = ''

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
				if (keyShift)
          game.actions['characterRunB'].start()
        else
          game.actions['characterWalkB'].start()
				keyA = true
			}
			break
		case 'KeyD':
			if (!keyD) {
        if (keyShift)
          game.actions['characterRun'].start()
        else
          game.actions['characterWalk'].start()
				keyD = true
			}
			break
		case 'ShiftLeft':
			if (!keyShift) {
				if (keyD) {
          game.actions['characterWalk'].stop()
          game.actions['characterRun'].start()
        } else if (keyA) {
          game.actions['characterWalkB'].stop()
          game.actions['characterRunB'].start()
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
			game.actions['characterWalkB'].stop()
      game.actions['characterRunB'].stop()
      game.actions['characterIdleB'].start()
			keyA = false
			break
		case 'KeyD':
      game.actions['characterWalk'].stop()
      game.actions['characterRun'].stop()
      game.actions['characterIdle'].start()
			keyD = false
			break
		case 'ShiftLeft':
			if (keyD) {
        game.actions['characterRunB'].stop()
        game.actions['characterWalkB'].start()
			} else if (keyA) {
        game.actions['characterRunB'].stop()
        game.actions['characterWalkB'].start()
      }
			keyShift = false
			break
		}
	}
})

/*document.addEventListener('fullscreenchange', e => {
  if (document.fullscreenElement) {
		game.mouse.visible = true
  } else {
		game.mouse.visible = false
  }
});*/

game.render()
