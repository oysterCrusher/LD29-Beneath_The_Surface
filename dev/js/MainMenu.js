ld.MainMenu = function() {

    var currentLevel = 0,
        levelButtonOffY = 0,
        transitionTime = 150,
        transitionTimer = 1000,
        transitionFrom = 0;

    this.enter = function() {
        transitionTimer = 1000;
    };

    this.exit = function() {

    };

    this.update = function(dt) {
        if (ld.input.getMouse().wasClicked) {
            ld.level.loadLevel(currentLevel);
            ld.state.changeState('game');
        } else if (ld.input.wasPressed(ld.Keycodes.Space)) {
            ld.level.loadLevel(currentLevel);
            ld.state.changeState('game');
        } else if (ld.input.wasPressed(ld.Keycodes.Down)) {
            if (currentLevel < ld.maps.length - 1) {
                currentLevel++;
                transitionTimer = 0;
                transitionFrom = levelButtonOffY;
            }
        } else if (ld.input.wasPressed(ld.Keycodes.Up)) {
            if (currentLevel > 0) {
                currentLevel--;
                transitionTimer = 0;
                transitionFrom = levelButtonOffY;
            }
        }

        if (transitionTimer < transitionTime) {
            transitionTimer += dt;
            if (transitionTimer > transitionTime) {
                transitionTimer = transitionTime;
            }
            levelButtonOffY = transitionFrom + (transitionTimer / transitionTime) * (-120 * currentLevel - transitionFrom);
        }
    };

    this.render = function() {
        ld.ctx.fillStyle = '#000000';
        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
        ld.ctx.drawImage(ld.cache.sprites['title'], 0, 0, 282, 60, 80, 50, 282, 60);
        ld.ctx.drawImage(ld.cache.sprites['menu_arrow'], 0, 0, 60, 60, 680, 330, 60, 60);

        for (var i = 0; i < ld.maps.length; i++) {
            ld.ctx.drawImage(ld.cache.sprites['level_button'], 0, 0, 340, 80, 760, 120 * i + 320 + levelButtonOffY, 340, 80);
            ld.ctx.drawImage(ld.cache.sprites['level_numbers'], 0, 39 * i, 65, 39, 980, 120 * i + 340 + levelButtonOffY, 65, 39);
        }
    };

};