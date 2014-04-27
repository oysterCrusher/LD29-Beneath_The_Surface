ld.Level = function() {

    var levelNumber = 0,
        view = 'below',
        nSteps = 0;

    this.loadLevel = function(n) {
        levelNumber = n;
        console.log(levelNumber);
        ld.map.setLevel(n);
        ld.player.setLevel(n);
        ld.blocks.setLevel(n);
        ld.persons.setLevel(n);
    };

    this.update = function() {

        if (ld.input.wasPressed(ld.Keycodes.Space)) {
            toggleView();
        }

        if (view === 'below') {
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
            } else if (ld.input.wasPressed(ld.Keycodes.E)) {
                advance();
            } else if (ld.input.wasPressed(ld.Keycodes.Q)) {
                retreat();
            }
        }

        if (ld.persons.hasFinished()) {
            ld.state.changeState('win');
        }
    };

    function advance() {
        ld.player.advance();
        ld.blocks.advance();
        ld.persons.advance();
        nSteps++;
    }

    function retreat() {
        if (nSteps > 0) {
            ld.persons.retreat();
            ld.blocks.retreat();
            ld.player.retreat();
            nSteps--;
        }
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
    };

};