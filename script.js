class Game {

    constructor() {
        this.trampoline = new Trampoline()
        this.figure = []
        this.score = 0
        this.addFigure(this)
        this.scoreCount(this)
        this.addFigure = this.addFigure.bind(this)
        this.isItGameOver
        this.life = 5
        this.gameOver()
    }

    addFigure(fixThis) {
        let timer = Math.floor((Math.random() * 6) +1) * 1500;
        fixThis.figure.push(new Figure())
        if(this.score > 10) {
            timer *= 0.9
        } else if(this.score > 20) {
            timer *= 0.85
        } else if(this.score > 30) {
            timer *= 0.8
        } else if(this.score > 40) {
            timer *= 0.75
        } else if(this.score > 50) {
            timer *= 0.7
        }
        
        setTimeout(function() {
            if(!fixThis.isItGameOver) {
                fixThis.addFigure(game)
            } else {
                // let figures = document.getElementsByClassName("jump")
                for(let i = 0; i < fixThis.figure.length; i++){
                    fixThis.figure[i].htmlRef.remove()
                    // debugger
                }
            }
            // console.log(timer)
        }, timer);
    }

    scoreCount(fixThis) {  
        setInterval(() => {
            fixThis.figure.forEach((fig)=>{
                if(isCollide(fixThis.trampoline.htmlRef, fig.htmlRef)) {
                    fixThis.score++
                    document.getElementById("score").innerHTML = fixThis.score
                }
            })
        }, 1000);   
    }

    gameOver() {
        let intervalId = setInterval(() => {
            if(this.life === 0) {
                // debugger
                this.isItGameOver = true
                document.getElementById("game-over").innerHTML = "GAME OVER"
                // let figures = document.getElementsByClassName("jump")
                for(let i = 0; i < this.figure.length; i++){
                    this.figure[i].htmlRef.remove()
                    // debugger
                }
                clearInterval(intervalId)
            }
        }, 100);
    }

    // start() {}
    //checkCollision() {}
}

class Trampoline {

    constructor() {
        this.htmlRef = document.getElementById("trampoline")
        this.initiateControls()
    }

    initiateControls() {
        var trampoline = this.htmlRef
        window.addEventListener("keydown", function(e) {
            switch(e.key) {
                case("ArrowRight"):
                    e.preventDefault()
                    if(trampoline.offsetLeft < 749) {
                    trampoline.style.left = `${trampoline.offsetLeft + 250}px`
                    }
                break;
                case("ArrowLeft"):
                    e.preventDefault()
                    if(trampoline.offsetLeft > 251) {
                    trampoline.style.left = `${trampoline.offsetLeft - 250}px`
                    }
                break;
            }
        })
    }
}


class Figure {

    constructor(game) {
        let img = document.createElement("img")
        img.setAttribute("src", "https://www.ssbwiki.com/images/thumb/b/b2/Mr._Game_%26_Watch_SSB4.png/250px-Mr._Game_%26_Watch_SSB4.png")
        img.setAttribute("class", "jump figureClass")
        container.appendChild(img)
        this.htmlRef = img
        this.intervalId
        this.bounce = this.bounce.bind(this)
        this.bounce()
        this.splat()
        this.immaHeadOut()
        // this.beep()
    }

    bounce() {
        let fixThis = this
        this.intervalId = setInterval(function(){
            if(isCollide(game.trampoline.htmlRef, fixThis.htmlRef)) {
                fixThis.htmlRef.classList.add("bounce1")
                fixThis.beep()
                if(fixThis.htmlRef.classList.contains("bounce1") && trampoline.offsetLeft === 500) {
                    fixThis.htmlRef.classList.add("bounce2")
                    fixThis.beep()
                } else if(fixThis.htmlRef.classList.contains("bounce2") && trampoline.offsetLeft === 750) {
                    fixThis.htmlRef.classList.add("bounce3")
                    fixThis.beep()
                }
            }
        }, 1000)
    }

    splat() {
        let fixThis = this
        setInterval(() => {
            if(fixThis.htmlRef.offsetTop > 740) {
                game.life -= 1
                fixThis.htmlRef.remove()
            }
        }, 100);
    }

    immaHeadOut() {
        let fixThis = this
        setInterval(() => {
             if(fixThis.htmlRef.offsetLeft > 960) {
                fixThis.htmlRef.remove()
            }
        }, 1000);
    }

    beep() {
        let boop = document.getElementById("beep")
        boop.play()
        .then(() => {
            console.log('audio playing')
        })
        .catch(() => {
            console.log('audio not playing')
        })
    }
}

function isCollide(element1, element2) {
    var a = {
        y: 100 - element1.offsetTop - element1.height,
        x: element1.offsetLeft,
        height: element1.height,
        width: element1.width
    }
    var b = {
        y: 100 - element2.offsetTop - element2.height,
        x: element2.offsetLeft,
        height: element2.height,
        width: element2.width
    }
    
    return !(
        ((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) || (a.x > (b.x + b.width))
    )
}

let game = new Game()
