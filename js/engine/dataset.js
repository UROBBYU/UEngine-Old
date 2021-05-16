import Game from './engine2.js'

export default class {
  static load(url) {
    // TODO
    return
  }

  constructor(this) {
    this.textures = this.textures
    this.objects = this.objects
    this.actions = this.actions
  }

  unpack(game) {
    if (this.objects) {
      for (let name in this.objects) {
        let type = this.objects[name].type.toLowerCase()
        delete this.objects[name].type
        switch (type) {
          case 'plane':
          case 'p':
          default:
            this.objects[name] = new Game.Plane(this.objects[name])
            break
          case 'slider':
          case 's':
            this.objects[name] = new Game.Slider(this.objects[name])
            break
          case 'slideshow':
          case 'ss':
            this.objects[name] = new Game.SlideShow(this.objects[name])
        }
      }
    }

    if (this.actions) {
      for (let name in this.actions) {
        let action = this.actions[name]
        switch (action.type.toLowerCase()) {
          case 'action':
          case 'a':
          default:
            this.actions[name] = new Game.Action(action.speed, action.func)
            break

          case 'animation':
          case 'an':
            this.actions[name] = new Game.Animation(action.speed, game.scene.get(action.object), game.textures[action.texture], action.func)
            break

          case 'animationslider':
          case 'slider':
          case 's':
            this.actions[name] = new Game.AnimationSlider(action.speed, game.scene.get(action.object), game.textures[action.texture], action.stepX, action.stepY)
            break

          case 'animationslideshow':
          case 'slideshow':
          case 'ss':
            this.actions[name] = new Game.AnimationSlideShow(action.speed, game.scene.get(action.object), game.textures[action.texture], action.options)
        }
      }
    }
  }
}
