ld.Level = function() {

    var levelNumber = 0;

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.blocks.setLevel(n);
    };

    this.update = function() {
        if (ld.input.wasPressed('left')) {
            if (ld.player.moveLeft()) {
                console.log('left')
            }
        } else if (ld.input.wasPressed('right')) {
            if (ld.player.moveRight()) {
                console.log('right')
            }
        } else if (ld.input.wasPressed('up')) {
            if (ld.player.moveUp()) {
                console.log('up')
            }
        } else if (ld.input.wasPressed('down')) {
            if (ld.player.moveDown()) {
                console.log('down')
            }
        }
    };

    this.render = function() {
        ld.map.render();
        ld.blocks.render();
        ld.player.render();
    };

};