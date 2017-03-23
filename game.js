// document.addEventListener('DOMContentLoaded', function () {
//   var myGamePiece
//   var myObstacles = []
//   var ctx
//
//   function startGame () {
//     myGamePiece = new Component(30, 30, 'rgba(0, 0, 255, 0.5)', 10, 120)
//     // myObstacle = new Component(10, 200, 'green', 300, 120)
//     myGameArea.start()
//   }
//
//   var myGameArea = {
//     canvas: document.createElement('canvas'),
//     start: function () {
//       this.canvas.width = 480
//       this.canvas.height = 270
//       this.context = this.canvas.getContext('2d')
//       document.body.insertBefore(this.canvas, document.body.childNodes[0])
//       this.frameNo = 0
//       this.interval = setInterval(updateGameArea, 20)
//       window.addEventListener('keydown', function (e) {
//         myGameArea.key = e.keyCode
//       })
//       window.addEventListener('keyup', function (e) {
//         myGameArea.key = false
//       })
//     },
//     stop: function () {
//       clearInterval(this.interval)
//     },
//     clear: function () {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
//     }
//   }
//
//   function everyinterval (n) {
//     if ((myGameArea.frameNo / n) % 1 === 0) { return true }
//     return false
//   }
//
//   function Component (width, height, color, x, y) {
//     this.width = width
//     this.height = height
//     this.speedX = 0
//     this.speedY = 0
//     this.x = x
//     this.y = y
//     this.update = function () {
//       ctx = myGameArea.context
//       ctx.fillStyle = color
//       ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
//     this.newPos = function () {
//       this.x += this.speedX
//       this.y += this.speedY
//     }
//     this.crashWith = function (otherobj) {
//       var myleft = this.x
//       var myright = this.x + (this.width)
//       var mytop = this.y
//       var mybottom = this.y + (this.height)
//       var otherleft = otherobj.x
//       var otherright = otherobj.x + (otherobj.width)
//       var othertop = otherobj.y
//       var otherbottom = otherobj.y + (otherobj.height)
//       var crash = true
//       if ((mybottom < othertop) ||
//                (mytop > otherbottom) ||
//                (myright < otherleft) ||
//                (myleft > otherright)) {
//         crash = false
//       }
//       return crash
//     }
//   }
//
//   function updateGameArea () {
//     var x, y
//     for (var i = 0; i < myObstacles.length; i += 1) {
//       if (myGamePiece.crashWith(myObstacles[i])) {
//         myGameArea.stop()
//         return
//       }
//     }
//     myGameArea.clear()
//     myGameArea.frameNo += 1
//     if (myGameArea.frameNo == 1 || everyinterval(100)) {
//       x = myGameArea.canvas.width
//       minHeight = 20
//       maxHeight = 200
//       height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
//       minGap = 50
//       maxGap = 200
//       gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
//       myObstacles.push(new Component(10, height, 'green', x, 0))
//       myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap))
//     }
//     for (i = 0; i < myObstacles.length; i += 1) {
//       myObstacles[i].x += -2
//       myObstacles[i].update()
//     }
//     myGamePiece.speedX = 0
//     myGamePiece.speedY = 0
//     if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -1 }
//     if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 1 }
//     if (myGameArea.key && myGameArea.key == 38) { myGamePiece.speedY = -1 }
//     if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY = 1 }
//     myGamePiece.newPos()
//     myGamePiece.update()
//   }
//
//   function moveup () {
//     myGamePiece.speedY -= 1
//   }
//
//   function movedown () {
//     myGamePiece.speedY += 1
//   }
//
//   function moveleft () {
//     myGamePiece.speedX -= 1
//   }
//
//   function moveright () {
//     myGamePiece.speedX += 1
//   }
//
//   function stopMove () {
//     myGamePiece.speedX = 0
//     myGamePiece.speedY = 0
//   }
//
//   var up = document.querySelector('.up')
//   var down = document.querySelector('.down')
//   var left = document.querySelector('.left')
//   var right = document.querySelector('.right')
//   up.addEventListener('click', moveup)
//   down.addEventListener('click', movedown)
//   left.addEventListener('click', moveleft)
//   right.addEventListener('click', moveright)
//   up.addEventListener('mouseup', stopMove)
//   down.addEventListener('mouseup', stopMove)
//   left.addEventListener('mouseup', stopMove)
//   right.addEventListener('mouseup', stopMove)
//   startGame()
// })

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.querySelector('#myCanvas')
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  var context = canvas.getContext('2d')
  var canvasPos = getPosition(canvas)
  var mouseX = 0
  var mouseY = 0

  canvas.addEventListener('mousemove', setMousePosition, false)

  function setMousePosition (e) {
    mouseX = e.clientX - canvasPos.x
    mouseY = e.clientY - canvasPos.y
  }

  function update () {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI, true)
    context.fillStyle = '#FF6A6A'
    context.fill()
    context.strokeWidth = 1
    context.strokeStyle = 'green'
    context.stroke()

    window.requestAnimationFrame(update)
  }
  update()

    // deal with the page getting resized or scrolled
  window.addEventListener('scroll', updatePosition, false)
  window.addEventListener('resize', updatePosition, false)

  function updatePosition () {
    canvasPos = getPosition(canvas)
  }

// Helper function to get an element's exact position
  function getPosition (el) {
    var xPos = 0
    var yPos = 0

	  while (el) {
    if (el.tagName === 'BODY') {
		  // deal with browser quirks with body/window/document and page scroll
		  var xScroll = el.scrollLeft || document.documentElement.scrollLeft
		  var yScroll = el.scrollTop || document.documentElement.scrollTop

		  xPos += (el.offsetLeft - xScroll + el.clientLeft)
		  yPos += (el.offsetTop - yScroll + el.clientTop)
    } else {
		  // for all other non-BODY elements
		  xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
		  yPos += (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
	  }
	  return {
    x: xPos,
    y: yPos
	  }
  }
})
