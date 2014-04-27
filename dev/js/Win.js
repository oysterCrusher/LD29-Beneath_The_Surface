ld.Win = function() {

    this.enter = function() {

    };

    this.exit = function() {

    };

    this.update = function() {
        if (ld.input.wasPressed(ld.Keycodes.Space)) {
            ld.state.changeState('mainMenu');
        }
    };

    this.render = function() {
        ld.level.render();
        ld.ctx.drawImage(ld.cache.sprites['win'], 0, 0, 200, 100, 540, 50, 200, 100);
    };

};