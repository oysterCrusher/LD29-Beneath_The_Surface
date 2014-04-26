ld.Level = function() {

    var levelNumber = 0,
        view = 'below';

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.player.setLevel(n);
        ld.blocks.setLevel(n);
        ld.persons.setLevel(n);
        ld.cracks.setLevel(n);
    };

    this.update = function() {

        if (ld.input.wasPressed('space')) {
            toggleView();
        }

        if (view === 'below') {
            if (ld.input.wasPressed(ld.Keycodes.A)) {
                if (ld.player.move(-1, 0)) {
                    ld.persons.advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.D)) {
                if (ld.player.move(1, 0)) {
                    ld.persons.advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.W)) {
                if (ld.player.move(0, -1)) {
                    ld.persons.advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.S)) {
                if (ld.player.move(0, 1)) {
                    ld.persons.advance();
                }
            } else if (ld.input.wasPressed(ld.Keycodes.E)) {
                ld.persons.advance();
            }
        }

        if (ld.persons.hasFinished()) {
            ld.state.changeState('win');
        }
    };

    function toggleView() {
        view = view === 'above' ? 'below' : 'above';
        ld.input.clear();
    }

    this.render = function() {
        ld.map.render(view);
        ld.cracks.render(view);
        ld.blocks.render(view);
        ld.player.render(view);
        ld.persons.render(view);
    };

};