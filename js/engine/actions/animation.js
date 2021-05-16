import Action from './action.js'

export default class extends Action {
  constructor(speed, object, texture, func) {
    super(speed, game => {
      if (object.texture !== texture)
        object.texture = texture
      func(game)
    })
  }
}
