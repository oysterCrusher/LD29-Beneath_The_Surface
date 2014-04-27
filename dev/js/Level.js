ld.Level = function() {

    var levelNumber = 0,
        view = 'below',
        nSteps = 0,
        hasLost = false;

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.player.setLevel(n);
        ld.blocks.setLevel(n);
        ld.persons.setLevel(n);
        nSteps = 0;
        hasLost = false;
        view = 'below';
        ld.input.clear();
    };

    this.loadNextLevel = function() {
        if (levelNumber < ld.maps.length - 1) {
            this.loadLevel(levelNumber + 1);
        }
    };

    this.getLevelNumber = function() {
        return levelNumber;
    };

    this.update = function() {

        if (ld.input.wasPressed(ld.Keycodes.Space)) {
            toggleView();
        }

        if (!hasLost) {
            if (ld.input.wasPressed(ld.Keycodes.Left)) {
                if (ld.player.move(-1, 0)) {
                    advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.Right)) {
                if (ld.player.move(1, 0)) {
                    advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.Up)) {
                if (ld.player.move(0, -1)) {
                    advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.Down)) {
                if (ld.player.move(0, 1)) {
                    advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.W)) {
                advance();
            }
        }

        if (ld.input.wasPressed(ld.Keycodes.U)) {
            retreat();
        } else if (ld.input.wasPressed(ld.Keycodes.R)) {
            this.loadLevel(levelNumber);
        } else if (ld.input.wasPressed(ld.Keycodes.M)) {
            ld.state.changeState('mainMenu');
        }

        if (ld.persons.hasFinished()) {
            ld.state.changeState('win');
        }
    };

    function advance() {
        ld.player.advance();
        ld.blocks.advance();
        if (ld.persons.advance()) {
            hasLost = true;
        }
        nSteps++;
        ld.input.clear();
    }

    function retreat() {
        if (nSteps > 0) {
            ld.persons.retreat();
            ld.blocks.retreat();
            ld.player.retreat();
            nSteps--;
            hasLost = false;
        }
        ld.input.clear();
    }

    function toggleView() {
        view = view === 'above' ? 'below' : 'above';
        ld.input.clear();
    }

    this.render = function() {
        ld.ctx.fillStyle = '#000000';
        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
        ld.map.render(view);
//        ld.cracks.render(view);
        ld.blocks.render(view);
        ld.player.render(view);
        ld.persons.render(view);

        if (hasLost) {
            ld.ctx.drawImage(ld.cache.sprites['lose'], 0, 0, 540, 54, 370, 50, 540, 54);
        }
    };

    this.renderView = function(v) {
        ld.ctx.fillStyle = '#000000';
        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
        ld.map.render(v);
        ld.blocks.render(v);
        ld.player.render(v);
        ld.persons.render(v);
        if (v === 'above') {
            ld.ctx.drawImage(ld.cache.sprites['level_numbers'], 0, 39 * levelNumber, 65, 39, 620, 20, 65, 39);
        }
    }

};