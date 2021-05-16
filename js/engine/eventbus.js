export default function(target) {
  target.events = Object.create({
    list: []
  }, {
    fire: {
      get() {
        return (name) => {
          if (target.events.list[name])
            target.events.list[name].forEach(func => func(target))
        }
      }
    }
  })
  target.addEventListener = (name, func) => {
    if (!target.events.list[name])
      target.events.list[name] = []
    target.events.list[name].push(func)
  }
  target.removeEventListener = (name, func) => target.events.list[name].splice(target.events.list[name].indexOf(func), 1)
}
