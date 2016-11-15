function Snake() {

    this.init()
    this.start()

}


Snake.prototype.init = function() {

    this.canvas = {
        obj: document.getElementById('snakeMap'),
        pen: document.getElementById('snakeMap').getContext('2d'),
        width: 500,
        height: 500
    }
    // this.canvas.obj.style.outline = "1px solid red"
    this.canvas.obj.setAttribute('height', this.canvas.height + 'px')
    this.canvas.obj.setAttribute('width', this.canvas.width + 'px')
    this.canvas.obj.style.height = this.canvas.width + 'px'
    this.canvas.obj.style.width = this.canvas.height + 'px'
    this.canvas.obj.style.margin = '80px 100px'


    this.world = {
        particle: {
            width: 18,
            height: 18,
            border: 2,
            color: 'rgb(219, 207, 202)',
            bgColor: 'rgb(255, 255, 255)',
        },
        isCountinue: true
    }
    this.world.particle.allHeight = this.world.particle.height + this.world.particle.border
    this.world.particle.allWidth = this.world.particle.width + this.world.particle.border
    this.world.height = this.canvas.height / this.world.particle.allHeight
    this.world.width = this.canvas.width / this.world.particle.allWidth


    this.snake = {
    	id: 1,
        width: 1,
        height: 5,
        direction: 'x',
        beforeDirection: 'x',
        pos:[[15,5],[14,5],[13,5],[12,5],[11,5],[10,5],[9,5],[8,5],[7,5],[6,5]],
        color: 'rgb(179, 197, 135)',
        v: 8,
        // auto: true
    }

    this.snake2 = {
    	id: 2,
        width: 1,
        height: 5,
        direction: '-x',
        beforeDirection: '-x',
        pos:[[6,20],[7,20],[8,20],[9,20],[10,20],[11,20],[12,20],[13,20],[14,20],[15,20]],
        color: 'rgb(175, 215, 237)',
        v: 8,
        auto: true
    }

    this.apple = {
    	width: 1,
    	height: 1,
    	color: 'rgb(244, 13, 100)',
    	pos: [20, 20],
    	freshTime: 5000,
    	nowTime: 5000,
    	expireV: 100 
    }

}

Snake.prototype.start = function() {

    var that = this
    setInterval(function() {
        if (that.world.isCountinue) {
            that.drawBackground()
            that.createApple()
            that.snakeMove(that.snake)
            that.snakeMove(that.snake2)
            that.drawSnake(that.snake)
            that.drawSnake(that.snake2)
        }
    }, 1000 / this.snake.v)

    this.eventBind()

}



Snake.prototype.drawBackground = function() {

    this.canvas.pen.fillStyle = this.world.particle.bgColor
    this.canvas.pen.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.canvas.pen.fillStyle = this.world.particle.color
    for (var i = this.world.width - 1; i >= 0; i--) {
        for (var j = this.world.height - 1; j >= 0; j--) {
            this.canvas.pen.fillRect
            (i * this.world.particle.allWidth + 1, j * this.world.particle.allHeight + 1,
             this.world.particle.width, this.world.particle.height)
        }
    }

}


Snake.prototype.snakeMove = function(snake) {

    if (snake.auto) {
        this.autoEat(snake)
    }

    if ('-' + snake.beforeDirection == snake.direction ||
     snake.beforeDirection == '-' + snake.direction) {
        snake.direction = snake.beforeDirection
    } else {
    	snake.beforeDirection = snake.direction
    }

    var tail = snake.pos.pop()
    switch (snake.direction) {
        case 'y': //top
            snake.pos.unshift([snake.pos[0][0], snake.pos[0][1] - 1])
            break;
        case '-y': //bottom
            snake.pos.unshift([snake.pos[0][0], snake.pos[0][1] + 1])
            break;
        case '-x': //left
            snake.pos.unshift([snake.pos[0][0] - 1, snake.pos[0][1]])
            break;
        case 'x': //right
            snake.pos.unshift([snake.pos[0][0] + 1, snake.pos[0][1]])
            break;
    }


    this.snakeCollision(snake, tail)

}


Snake.prototype.snakeCollision = function(snake, tail) {

	var header = snake.pos[0].toString()
	//eat apple
    if (header == this.apple.pos.toString()) { 
    	this.apple.nowTime = this.apple.freshTime
    	snake.pos.push(tail)
    }


    var other = this.snake2
    //attack
    if (snake.id == 2) { other = this.snake }
    if (this.tool_dot_contain(header, other.pos)) {
    	snake.pos.shift()
    	if (snake.pos.length <= 2) {
    		console.log('snake lose:' + snake.id)
    		this.world.isCountinue = false
    	}
    }


}



Snake.prototype.drawSnake = function(snake) {

    this.canvas.pen.fillStyle = snake.color
    for (var i = snake.pos.length - 1; i >= 0; i--) {
    	// snake.pos[i]
    	this.canvas.pen.fillRect
    	(snake.pos[i][0] * this.world.particle.allWidth,
    	 snake.pos[i][1] * this.world.particle.allHeight, 
    	 this.world.particle.allWidth, this.world.particle.allHeight)
    }

}


Snake.prototype.eventBind = function() {

	var that = this
    window.addEventListener('keydown', function(e) {
    	// var _direction = that.snake.direction
    	// console.log(e.keyCode)
        switch (e.keyCode) {
        	case 38: //top
        		that.snake.direction = 'y'
        		break;
        	case 40: //bottom
        		that.snake.direction = '-y'
        		break;
        	case 37: //left
        		that.snake.direction = '-x'
        		break;
        	case 39: //right
        		that.snake.direction = 'x'
        		break;

        	case 87: //top
        		that.snake2.direction = 'y'
        		break;
        	case 83: //bottom
        		that.snake2.direction = '-y'
        		break;
        	case 65: //left
        		that.snake2.direction = '-x'
        		break;
        	case 68: //right
        		that.snake2.direction = 'x'
        		break;				
        }
    }, false)

}


//apple

Snake.prototype.createApple = function() {

	this.apple.nowTime += this.apple.expireV
	if (this.apple.nowTime >= this.apple.freshTime) {
		this.apple.nowTime = 0
		this.apple.pos = [Math.round(Math.random() * (this.world.width - 1)), 
		Math.round(Math.random() * (this.world.height - 1))]

		// 苹果出生在蛇身上
		if (this.tool_dot_contain(this.apple.pos, this.snake.pos) ||
			this.tool_dot_contain(this.apple.pos, this.snake2.pos)) {
			this.apple.nowTime = this.apple.freshTime
			this.createApple()
		}

	}

    this.canvas.pen.fillStyle = this.apple.color
    this.canvas.pen.fillRect(this.apple.pos[0] * this.world.particle.allWidth,
        this.apple.pos[1] * this.world.particle.allHeight,
        this.world.particle.allWidth, this.world.particle.allHeight)
    // this.apple

}

Snake.prototype.tool_dot_contain = function(dot, dotArr) {

	var result = false
	for (var i = dotArr.length - 1; i >= 0; i--) {
		if (dotArr[i].toString() == dot.toString()) {
			result = true
		}
	}
	return result

}

Snake.prototype.autoEat = function(snake) {

    if (snake.pos[0][0] !== this.apple.pos[0]) {
        if (snake.pos[0][0] > this.apple.pos[0]) {
            snake.direction = '-x'
        } else {
            snake.direction = 'x'
        }
    }

    if (snake.pos[0][1] !== this.apple.pos[1]) {
        if (snake.pos[0][1] > this.apple.pos[1]) {
            snake.direction = 'y'
        } else {
            snake.direction = '-y'
        }
    }

}





var snake = new Snake()
