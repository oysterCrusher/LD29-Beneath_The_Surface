ld.Level = function() {

    var levelNumber = 0;

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.blocks.setLevel(n);
    };

    this.update = function() {
        if (ld.input.wasPressed('left')) {
            if (ld.player.move(-1, 0)) {

            }
        } else if (ld.input.wasPressed('right')) {
            if (ld.player.move(1, 0)) {

            }
        } else if (ld.input.wasPressed('up')) {
            if (ld.player.move(0, -1)) {

            }
        } else if (ld.input.wasPressed('down')) {
            if (ld.player.move(0, 1)) {

            }
        }
    };

    this.render = function() {
        ld.map.render();
        ld.blocks.render();
        ld.player.render();
    };

};