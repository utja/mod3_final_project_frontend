document.addEventListener('DOMContentLoaded', function() {

  const startGame = () => {
    myGameArea.start();
  }

  const gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
      this.canvas.width = 700
      this.canvas.height = 700
      this.canvas.style.backgroundColor = "yellow"
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

  const Obstacle = function(x, y, width, height, color) {
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
      // console.log(this.x)
    }.bind(this), 100)

  }

  // function render(object) {
  //   let ctx = gameArea.context
  //   ctx.clearRect(0,0, gameArea.canvas.width, gameArea.canvas.height)
  //
  //   ctx.fillStyle = object.color
  //   ctx.fillRect(object.x, object.y, object.width, object.height)
  // }


  let obs = new Obstacle(350, 0, 50, 200, 'green')

  let obsTwo = new Obstacle(350, 500, 50, 200, 'green')

  // render(obs)
  // obs.animate()


  const Hero = function(x, y, width, height, color) {
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

  const hero = new Hero(0, 0, 100, 100, "blue",)

  function render() {
    let ctx = gameArea.context
    ctx.clearRect(0,0, gameArea.canvas.width, gameArea.canvas.height)

    ctx.fillStyle = obs.color
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height)

    ctx.fillStyle = obsTwo.color
    ctx.fillRect(obsTwo.x, obsTwo.y, obsTwo.width, obsTwo.height)

    ctx.fillStyle = hero.color
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height)

    // debugger
    hero.checkCollision(obsTwo)
    hero.checkCollision(obs)
  }
  // render()
  // render()

  function moveObs() {
    setInterval(function(){
    obs.x -= 10
    obsTwo.x -= 10
    render()
  }, 100)}
  moveObs()

  document.onkeydown = function(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        hero.y -= 100
        if (hero.y < 0) {
          hero.y = 0
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        hero.y += 100
        if (hero.y > gameArea.canvas.height - hero.height) {
          hero.y = gameArea.canvas.height - hero.height
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        hero.x -= 100
        if (hero.x < 0) {
          hero.x = 0
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        hero.x += 100
        if (hero.x > gameArea.canvas.width - hero.width) {
          hero.x = gameArea.canvas.width - hero.width
        }
        break
      default:
        break
    }
  }

  Hero.prototype.checkCollision = function (obstacle) {
    //hero
    this.left = this.x
    this.right = this.x + this.width
    this.top = this.y
    this.bottom = this.y + this.height

    //obstacle
    obstacle.left = obstacle.x
    obstacle.right = obstacle.x + obstacle.width
    obstacle.top = obstacle.y
    obstacle.bottom = obstacle.y + obstacle.height

    //check for collision
    if (this.left <= obstacle.right && this.right >= obstacle.left && this.top <= obstacle.bottom && this.bottom >= obstacle.top) {
      console.log('hit')
    }
    //  else if (this.right >= obstacle.left && this.bottom >= obstacle.top) {
    //   console.log('pow')
    // }

    // debugger
  }



  // let keyCheck = document.addEventListener('keydown', e => {
  //   e.preventDefault()
  //
  //   })

  // obs.render.call(hero)
  // console.log('heasdllo')
  // debugger

})
