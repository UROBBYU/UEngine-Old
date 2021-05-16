import Game from './engine/engine2.js'

window.Game = Game

window.game = new Game(display)

game.scene.camera.width = 1920
game.scene.camera.height = 1080

game.scene.add('chest', 2, new Game.SlideShow({
  position: [36, 36]
}))
game.scene.add('background', 1, new Game.Slider({
  position: [36, 36]
}))

game.loader.loadTextures({
  background: {
    src: 'img/Backgrounds/Background2.jpg',
    size: [72, 72],
    scale: [16 / 9, 1],
    anchor: [0.5, 0.5]
  },
  chest: {
    src: 'img/Chest.png',
    size: [15, 16],
    anchor: [7 / 15, 0.5]
  }
}).then(() => {
  game.scene.get('plane1').texture = game.textures.background
  game.scene.get('plane2').texture = {
    texture: game.textures.chest,
    slides: 3
  }
  game.render()
  game.isPaused = false
})
