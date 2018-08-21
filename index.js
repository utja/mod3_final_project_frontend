document.addEventListener('DOMContentLoaded', function() {

  const startGame = () => {
    myGameArea.start();
  }

  console.log('hello')
  const elbin = {
    name: 'elbin'
  }

  const gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
      this.canvas.width = 700
      this.canvas.height = 700
      this.canvas.style.backgroundColor = "red"
      this.frameNo = 0
      this.context = this.canvas.getContext("2d")
      document.body.insertBefore(this.canvas, document.body.childNodes[0])
      //add back when ready
      // setInterval(function(){console.log('hi from interval')}, 2000)

    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log('clear')
    }

  }
  gameArea.start()

  const Obstacle = function(width, height, color, x, y) {
    this.score = 0
    this.width = width
    this.height = height
    this.color = color
    // this.speedX = 0
    // this.speedY = 0
    this.x = x
    this.y = y
    this.gravity = 0
    this.gravitySpeed = 0
  }

  Obstacle.prototype.render = function(){
    let ctx = gameArea.context

    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    // debugger
  }

  Obstacle.prototype.animate = function(){
    let ctx = gameArea.context

    setInterval(function(){
      // let ctx = gameArea.context
      ctx.clearRect(this.x+90, this.y, 10, this.height)
      this.x -= 10

      // ctx.fillStyle = this.color
      // ctx.fillRect(this.x, this.y, this.width, this.height)
      this.render()
    }.bind(this), 100)

  }


  const Hero = function(width, height, color, x, y) {
    this.score = 0
    this.width = width
    this.height = height
    this.color = color
    // this.speedX = 0
    // this.speedY = 0
    this.x = x
    this.y = y
    this.gravity = 0
    this.gravitySpeed = 0
  }

  const hero = new Hero(10, 10, "blue", 100, 100)
  console.log(hero)
  // debugger

})
