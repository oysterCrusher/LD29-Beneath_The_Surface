ld.Level = function() {

    var levelNumber = 0,
        isComplete = false;

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.blocks.setLevel(n);
        ld.persons.setLevel(n);
        isComplete = false;
    };

    this.completed = function() {
        console.log('complete');
        isComplete = true;
    };

    this.update = function() {
        if (isComplete) {
            return;
        }

        if (ld.input.wasPressed('left')) {
            if (ld.player.move(-1, 0)) {
                ld.persons.advance();
            }
        } else if (ld.input.wasPressed('right')) {
            if (ld.player.move(1, 0)) {
                ld.persons.advance();
            }
        } else if (ld.input.wasPressed('up')) {
            if (ld.player.move(0, -1)) {
                ld.persons.advance();
            }
        } else if (ld.input.wasPressed('down')) {
            if (ld.player.move(0, 1)) {
                ld.persons.advance();
            }
        }
    };

    this.render = function() {
        ld.map.render();
        ld.blocks.render();
        ld.player.render();
        ld.persons.render();
    };

};