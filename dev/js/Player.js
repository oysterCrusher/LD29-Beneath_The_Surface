ld.Player = function() {

    var x = 3,
        y = 10;

    this.update = function() {
        if (ld.input.wasPressed('left')) {
            x--;
        } else if (ld.input.wasPressed('right')) {
            x++;
        } else if (ld.input.wasPressed('up')) {
            y--;
        } else if (ld.input.wasPressed('down')) {
            y++;
        }
    };

    this.render = function() {
        ld.ctx.drawImage(ld.cache.sprites['player'], 60, 0, 60, 60, x * 60 + 40, y * 60 + 30, 60, 60);
    };

};