document.addEventListener('DOMContentLoaded', function() {

  let scoreValue = 0
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
  }

  let obstArray = []

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

    //check for collision and end game
    if (this.left < obstacle.right && this.right > obstacle.left && this.top < obstacle.bottom && this.bottom > obstacle.top) {
      alert(`YOU LOSE! YOUR SCORE IS ${scoreValue}`)
      gameArea.clear()
      obstArray = []
      gameEnded = true
      hero.posX = 0
      hero.posY = 0

      postScore()

      gameArea.start()
    }
  }

  // const fetchUsers = function() {
  //   fetch('http://localhost:3000/api/v1/users').then(r => r.json()).then
  // }

  const postScore = function() {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({"user_id": 1, "score": `${scoreValue}`}
      )
    }

    fetch('http://localhost:3000/api/v1/scores', config).then(r => r.json()).then(listScores)
  }

  const parseScores = function(array) {
    let sortedArray = array.sort(function(a, b){return b.score - a.score})
    return sortedArray.slice(0,10)
  }

  const listScores = function() {
    fetch('http://localhost:3000/api/v1/scores').then(r => r.json()).then(array => parseScores(array)).then(array => renderScores(array))
  }

  const makeLi = function(scoreObj) {
    let listItem = document.createElement('li')
    listItem.className = 'score'
    listItem.dataset.id = `${scoreObj.id}`
    listItem.innerText = `${scoreObj.score}`
    return listItem
  }

  const renderScores = function(array) {
    let scoreList = document.getElementById('scores')
    scoreList.innerHTML = ''
    array.forEach(el => {
      scoreList.appendChild(makeLi(el))
    })
    // console.log(array)

  }

  // const hero = new Hero(0, 0, 75, 75, "blue",)

  function render() {
    hero.gravitySpeed += hero.gravity;
    hero.posY += hero.speedY + hero.gravitySpeed
    if (hero.posY < 0) {
      hero.posY = 0
    }
    if (hero.posY > gameArea.canvas.height - hero.height){
      hero.posY = gameArea.canvas.height - hero.height}
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
  //keydown event listener for hero
  // document.onkeydown = function(e) {
  //   let ctx = gameArea.context
  //   let moveAmount = 100
  //   switch (e.key) {
  //     case 'ArrowUp':
  //       e.preventDefault()
  //       hero.y -= moveAmount
  //       if (hero.y < 0) {
  //         hero.y = 0
  //       }
  //       break
  //     case 'ArrowDown':
  //       e.preventDefault()
  //       hero.y += moveAmount
  //       if (hero.y > gameArea.canvas.height - hero.height) {
  //         hero.y = gameArea.canvas.height - hero.height
  //       }
  //       break
  //     case 'ArrowLeft':
  //       e.preventDefault()
  //       hero.x -= moveAmount
  //       if (hero.x < 0) {
  //         hero.x = 0
  //       }
  //       break
  //     case 'ArrowRight':
  //       e.preventDefault()
  //       hero.x += moveAmount
  //       if (hero.x > gameArea.canvas.width - hero.width) {
  //         hero.x = gameArea.canvas.width - hero.width
  //       }
  //       break
  //     default:
  //       break
  //
  //   }
  // }

  // event listener for bird (not blue square)
  document.addEventListener('keydown', e => {
    if (e.key === ' ') {
      e.preventDefault()
      hero.gravity = -0.2
      // if (hero.posY < 0) {
      //   hero.posY = 0
      // }
      render()
    }
  })

  document.addEventListener('keyup', e => {
    if (e.key === ' ') {
      e.preventDefault()
      hero.gravity = 0.05

      render()
    }
  })
  // document.onkeydown = function(e) {
  //   let ctx = gameArea.context
  //   let moveAmount = 100
  //   console.log(e.key)
  //   switch (e.key) {
  //     case ' ':
  //       e.preventDefault()
  //
  //     default:
  //       break
  //
  //   }
  // }

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
