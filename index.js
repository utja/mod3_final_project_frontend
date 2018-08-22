document.addEventListener('DOMContentLoaded', function() {

  let gameEnded = false
  const gameArea = {
    canvas: document.createElement("canvas"),

    start: function(){
      this.canvas.width = 700
      this.canvas.height = 700
      this.canvas.style.backgroundColor = "yellow"
      this.score = 0
      let scoreSpan = document.getElementById('score')
      let scoreValue = 0
      setInterval(()=>{
        if (gameEnded === false) {
          this.score++
          scoreValue = this.score
        } else {
          this.score = 0
        }
        scoreSpan.innerText = this.score
      }, 100)

      this.context = this.canvas.getContext("2d")
      gameEnded = false
      document.body.insertBefore(this.canvas, document.body.childNodes[0])

    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // console.log('clear')
    }

  }

  gameArea.start()

  const scoreIncrement = () =>{
    gameArea.score++
  }

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


  // Obstacle.prototype.animate = function(){
  //   let ctx = gameArea.context
  //
  //   setInterval(function(){
  //     // let ctx = gameArea.context
  //     ctx.clearRect(this.x+90, this.y, 10, this.height)
  //     this.x -= 10
  //
  //     // ctx.fillStyle = this.color
  //     // ctx.fillRect(this.x, this.y, this.width, this.height)
  //     this.render()
  //     // console.log(this.x)
  //   }.bind(this), 100)
  //
  // }


  // function render(object) {
  //   let ctx = gameArea.context
  //   ctx.clearRect(0,0, gameArea.canvas.width, gameArea.canvas.height)
  //
  //   ctx.fillStyle = object.color
  //   ctx.fillRect(object.x, object.y, object.width, object.height)
  // }

  Obstacle.prototype.renderObs = function(){
    let ctx = gameArea.context
    // ctx.clearRect(this.x, this.y, this.width, this.height)
    ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height)
    this.x -= 10
    // ctx.beginPath()
    obstArray.forEach(function(obs){
      ctx.fillStyle = obs.color
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height)
    })
  }

  Obstacle.prototype.moveObs = function() {
    let ctx = gameArea.context

    this.x -= 10

    // render()
  }

  let obstArray = []


  // function to generate obstacles
  // const generateObstacles = setInterval(function(){
  //   const y = Math.floor(Math.random()*gameArea.canvas.height)
  //   const x = gameArea.canvas.width
  //   const width = 50
  //   const height = Math.floor(Math.random()*500)
  // //
  //   const newObs = new Obstacle(x, y, width, height, 'green')
  //   // obstArray.push(newObs)
  //   // newObs.renderObs()
  //   newObs.moveObs()
  //   // console.log('generate')
  // }, 1000)

  const generateObstacle = function() {
    if (gameEnded === false) {
      const height = Math.floor(Math.random()*(500-200)) + 100
      const y = Math.floor(Math.random()*(gameArea.canvas.height- 200))
      const x = gameArea.canvas.width
      const width = 50
      const newObs = new Obstacle(x, y, width, height, 'green')
      obstArray.push(newObs)
  }
  }

  const animateObstacles = function() {
    obstArray.forEach(obstacle => {
      obstacle.renderObs()
      // obstacle.moveObs()

      // console.log(obstacle.x)
    })
  }



  // console.log(newObs)
  // let obs = new Obstacle(350, 0, 50, 200, 'green')
  //
  // let obsTwo = new Obstacle(350, 500, 50, 200, 'green')

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
    if (this.left < obstacle.right && this.right > obstacle.left && this.top < obstacle.bottom && this.bottom > obstacle.top) {
      alert('YOU LOSE!')
      gameArea.clear()
      obstArray = []
      gameEnded = true
      hero.x = 0
      hero.y = 300

      gameArea.start()
    }
  }

  const hero = new Hero(0, 0, 75, 75, "blue",)

  function render() {
    let ctx = gameArea.context
    // ctx.clearRect(hero.x, hero.y, hero.width, hero.height)
    // ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height)
    //
    // ctx.fillStyle = obs.color
    // ctx.fillRect(obs.x, obs.y, obs.width, obs.height)

    // ctx.fillStyle = obsTwo.color
    // ctx.fillRect(obsTwo.x, obsTwo.y, obsTwo.width, obsTwo.height)

    ctx.fillStyle = hero.color
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height)

    // debugger
    // hero.checkCollision(obsTwo)
    // hero.checkCollision(obs)
  }

  // render()

  const play = function() {
  setInterval(generateObstacle, 1500)
  setInterval(() => {
    // generateObstacle()
    if (gameEnded === false) {
      animateObstacles()
      render()
      obstArray.forEach(obst => {
        hero.checkCollision(obst)
      })
    }}, 50)
  }

  play()
  //keydown event listener for hero
  document.onkeydown = function(e) {
    let ctx = gameArea.context
    let moveAmount = 100
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        hero.y -= moveAmount
        if (hero.y < 0) {
          hero.y = 0
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        hero.y += moveAmount
        if (hero.y > gameArea.canvas.height - hero.height) {
          hero.y = gameArea.canvas.height - hero.height
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        hero.x -= moveAmount
        if (hero.x < 0) {
          hero.x = 0
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        hero.x += moveAmount
        if (hero.x > gameArea.canvas.width - hero.width) {
          hero.x = gameArea.canvas.width - hero.width
        }
        break
      default:
        break

    }
  }




  // let keyCheck = document.addEventListener('keydown', e => {
  //   e.preventDefault()
  //
  //   })

  // obs.render.call(hero)
  // console.log('heasdllo')
  // debugger

})
