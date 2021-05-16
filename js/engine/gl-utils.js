 var glUtils = {
  uniformF: (...val) => new Object({
    type: 'float',
    value: val
  }),

  uniformI: (...val) => new Object({
    type: 'int',
    value: val
  }),

  uniformUI: (...val) => new Object({
    type: 'uint',
    value: val
  }),

  texture: (image) => new Object({
    type: 'tex',
    value: image
  }),

  buffer: (...data) => new Object({
    type: 'buff',
    value: data
  }),

  update: (programInfo, data) => {
    for (let key in data) {
      switch (data[key].type) {
        case 'float':
          glUtils.writeUniformF(programInfo.gl, programInfo.program, key, data[key].value)
          break
        case 'int':
          glUtils.writeUniformI(programInfo.gl, programInfo.program, key, data[key].value)
          break
        case 'uint':
          glUtils.writeUniformUI(programInfo.gl, programInfo.program, key, data[key].value)
          break
        case 'tex':
          if (!programInfo.textures.map.has(key))
            programInfo.textures.set(key, programInfo.gl.createTexture())
          glUtils.writeTexture(programInfo.gl, programInfo.textures.get(key), programInfo.textures.getIndex(key), data[key].value)
          break
        case 'buff':
          if (!programInfo.buffers[key]) {
            programInfo.buffers[key] = programInfo.gl.createBuffer()
          }
          glUtils.writeBuffer(programInfo.gl, programInfo.program, programInfo.buffers[key], key, data[key].value)
          break
        default:
          console.error('Invalid data', data[key])
          return
      }
    }
  },

  writeTexture: (gl, texture, index, image) => {
    gl.activeTexture(gl.TEXTURE0 + index)
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image)
  },

  writeBuffer: (gl, program, buffer, name, ...data) => {
    let location = gl.getAttribLocation(program, name)
    let size = data[0].length
    let dat = []
    for (let arr of data) {
      for (let val of arr) {
        dat.push(val)
      }
    }
    gl.enableVertexAttribArray(location)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dat), gl.STATIC_DRAW)
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
  },

  writeUniformF: (gl, program, name, data) => {
    var size = data.length
    var location = gl.getUniformLocation(program, name)
    switch (size) {
      case 1:
        gl.uniform1fv(location, data)
        break
      case 2:
        gl.uniform2fv(location, data)
        break
      case 3:
        gl.uniform3fv(location, data)
        break
      case 4:
        gl.uniform4fv(location, data)
        break
      default:
        console.error('Invalid data', data)
    }
  },

  writeUniformI: (gl, program, name, ...data) => {
    var size = data.length
    var location = gl.getUniformLocation(program, name)
    switch (size) {
      case 1:
        gl.uniform1iv(location, data)
        break
      case 2:
        gl.uniform2iv(location, data)
        break
      case 3:
        gl.uniform3iv(location, data)
        break
      case 4:
        gl.uniform4iv(location, data)
        break
      default:
        console.error('Invalid data:', data)
    }
  },

  writeUniformUI: (gl, program, name, ...data) => {
    var size = data.length
    var location = gl.getUniformLocation(program, name)
    switch (size) {
      case 1:
        gl.uniform1uiv(location, data)
        break
      case 2:
        gl.uniform2uiv(location, data)
        break
      case 3:
        gl.uniform3uiv(location, data)
        break
      case 4:
        gl.uniform4uiv(location, data)
        break
      default:
        console.error('Invalid data:', data)
    }
  },

  createShader: (gl, type, source) => {
    var shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      return shader
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
  },

  createProgram: (gl, vertexShader, fragmentShader) => {
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS))
      return program
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
  },

  cropBitmap: (image, offsetX, offsetY, width, height) => {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    let newImg = ctx.getImageData(offsetX, offsetY, width, height)
    return createImageBitmap(newImg, 0, 0, newImg.width, newImg.height)
  }
}

export default glUtils
