$(function() {

    var flybird = new FlyBird()
})


function FlyBird() {

    this.init()
    this.start()
        //  this.drawBird()

}

FlyBird.prototype.init = function() {

    this.world = {
        obj: $('#mobile'),
        height: 667,
        width: 375,
        gravitation: 0.3
    }

    this.bird = {
        obj: $('#bird'),
        height: 20,
        width: 30,
        pos: {
            x: 50,
            y: this.world.height / 2
        },
        dropTime: 0,
        speed: 0
    }


    this.treeOptions = {
        xSpeed: -2,
        distance: 500,
        width: 60,
    }
    this.treeOptions.readlyShowDistance = -this.treeOptions.width - this.treeOptions.distance * 2


    this.trees = [{
        obj: $('#tree1'),
        width: this.treeOptions.width,
        height: this.world.height * 0.7,
        pos: {
            x: -this.treeOptions.width,
            y: 0
        }
    }, {
        obj: $('#tree2'),
        width: this.treeOptions.width,
        height: this.world.height * 0.7,
        pos: {
            x: -this.treeOptions.width - this.treeOptions.distance,
            y: 0
        }
    }, {
        obj: $('#tree3'),
        width: this.treeOptions.width,
        height: this.world.height * 0.7,
        pos: {
            x: -this.treeOptions.width + this.treeOptions.distance,
            y: 0
        }
    }]



}

FlyBird.prototype.start = function() {

    // var that = this

    this.drawBird()
    this.eventBind()

}

//掉地上或者飞到顶部gg
FlyBird.prototype.testCollision = function() {
    var collision = false
    for (var i = this.trees.length - 1; i >= 0; i--) {

        //如果bird x 在 tree x 的范围
        if ((this.bird.pos.x + this.bird.width) >= this.trees[i].pos.x &&
            this.bird.pos.x <= (this.trees[i].pos.x + this.treeOptions.width)) {

            if (this.trees[i].pos.y == 0) { //树在地上
                if (this.bird.pos.y <= this.trees[i].height) {
                	collision = true
                }
            } else { //树在天上
            	if ((this.bird.pos.y + this.bird.height) >= (this.world.height - this.trees[i].height)) {
            		collision = true
            	}
            }

        }
    }

    return this.bird.pos.y < 0 || collision ||
        this.bird.pos.y > (this.world.height - this.bird.height)
}

FlyBird.prototype.drawBird = function() {

    var that = this
    this.bird.dropTime += 0.06
    this.bird.speed = this.bird.speed - this.world.gravitation * (this.bird.dropTime * this.bird.dropTime)
    this.bird.pos.y = this.bird.pos.y + this.bird.speed

    this.bird.obj.css({
        'left': this.bird.pos.x,
        'bottom': this.bird.pos.y
    })


    if (this.testCollision()) {
        this.gameover()
    } else {
        requestAnimationFrame(function() {
            that.drawBird()
            that.drawTree()
        })
    }

}

FlyBird.prototype.drawTree = function() {

    var that = this
    for (var i = that.trees.length - 1; i >= 0; i--) {


        that.trees[i].pos.x += that.treeOptions.xSpeed

        if (that.trees[i].pos.x >= -this.treeOptions.width) { //有显示才移动
            that.trees[i].obj.css({
                height: that.trees[i].height,
                left: that.trees[i].pos.x,
                bottom: that.trees[i].pos.y
            })
        }

        if (that.trees[i].pos.x <= this.treeOptions.readlyShowDistance) { //重新生成，进入显示区域
            this.randomSetTree(i)
        }

    }

}
FlyBird.prototype.randomSetTree = function(i) {

    var level = 10 - 4
    var random = Math.ceil(Math.random() * level)
    var is = Math.random() > 0.5 ? 1 : 0

    this.trees[i].height = this.world.height - this.bird.height * (10 + random)
    this.trees[i].pos.y = (this.world.height - this.trees[i].height) * is
    this.trees[i].pos.x = -this.treeOptions.width + this.treeOptions.distance

}


FlyBird.prototype.eventBind = function() {

    var that = this
    this.world.obj.on('mousedown', function() {
        that.bird.dropTime = 0
        that.bird.speed = 4
    })

}


FlyBird.prototype.gameover = function() {
    console.log('game over')
}
