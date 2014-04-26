ld.Win = function() {

    this.enter = function() {

    };

    this.exit = function() {

    };

    this.update = function() {
        if (ld.input.getMouse().wasClicked) {
            ld.state.changeState('mainMenu');
        }
    };

    this.render = function() {
        ld.ctx.fillStyle = '#102030';
        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
        ld.ctx.drawImage(ld.cache.sprites['win'], 0, 0, 200, 100, 540, 50, 200, 100);
    };

};