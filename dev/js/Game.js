ld.Game = function() {

    this.enter = function() {

    };

    this.exit = function() {

    };

    this.update = function() {
        ld.level.update();
    };

    this.render = function() {
//        ld.ctx.fillStyle = '#000000';
//        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
        ld.level.render();
    };

};