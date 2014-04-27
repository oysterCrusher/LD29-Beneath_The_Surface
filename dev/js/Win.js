ld.Win = function() {

    this.enter = function() {

    };

    this.exit = function() {

    };

    this.update = function() {
        if (ld.input.wasPressed(ld.Keycodes.M)) {
            ld.state.changeState('mainMenu');
        } else if (ld.input.wasPressed(ld.Keycodes.N)) {
            ld.level.loadNextLevel();
            ld.state.changeState('game');
        }
    };

    this.render = function() {
        ld.level.render();
        if (ld.level.getLevelNumber() !== ld.maps.length - 1) {
            ld.ctx.drawImage(ld.cache.sprites['win'], 0, 0, 360, 116, 460, 40, 360, 116);
        } else {
            ld.ctx.drawImage(ld.cache.sprites['complete'], 0, 0, 360, 116, 460, 40, 360, 116);
        }
    };

};