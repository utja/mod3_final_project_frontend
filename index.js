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

      setInterval(()=>{
        if (gameEnded === false) {
          this.score++
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
    this.x = x
    this.y = y
    this.gravity = 0
    this.gravitySpeed = 0
  }

  Obstacle.prototype.renderObs = function(){
    let ctx = gameArea.context
    ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height)
    this.x -= 3
    obstArray.forEach(function(obs){
      ctx.fillStyle = obs.color
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height)
    })
  }

  Obstacle.prototype.moveObs = function() {
    let ctx = gameArea.context

    this.x -= 10
  }

  let obstArray = []

  const generateObstacle = function() {
    if (gameEnded === false) {
      const y = Math.floor(Math.random()*gameArea.canvas.height)
      const x = gameArea.canvas.width
      const width = 50
      const height = Math.floor(Math.random()*(500-200)) + 100

      const newObs = new Obstacle(x, y, width, height, 'green')
      obstArray.push(newObs)
    }
  }

  const animateObstacles = function() {
    obstArray.forEach(obstacle => {
      obstacle.renderObs()
    })
  }

  let ctx = gameArea.context

  const hero = new Image();
  hero.src = 'imgs/hero.png';
  hero.width = 50
  hero.height = 50
  hero.speedX = 0
  hero.speedY = 0
  hero.posX = 0
  hero.posY = 0
  hero.gravity = 0.05
  hero.gravitySpeed = 0

  hero.checkCollision = function(obstacle) {
    //hero
    this.left = this.posX
    this.right = this.posX + this.width
    this.top = this.posY
    this.bottom = this.posY + this.height

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
      hero.posX = 0
      hero.posY = 0

      gameArea.start()
    }
  }


  function render() {
    hero.gravitySpeed += hero.gravity;
    hero.posY += hero.speedY + hero.gravitySpeed
    ctx.drawImage(hero, hero.posX, hero.posY)
    // debugger
  }

  function accelerate(n) {
      hero.gravity = n;
  }

  const play = function() {
  setInterval(generateObstacle, 2500)
  setInterval(() => {
    if (gameEnded === false) {
      animateObstacles()
      render()
      obstArray.forEach(obst => {
        hero.checkCollision(obst)
      })
    }}, 50)
  }

  play()
  let accelerateBtn = document.getElementById('accelerate')
  accelerateBtn.onmousedown = function() {
    hero.gravity = -0.2
    render()
  }
  accelerateBtn.onmouseup = function() {
    hero.gravity = 0.05
    render()
  }

  // debugger
})
