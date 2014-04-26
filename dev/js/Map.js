ld.Map = function() {

    var tilesAbove = ld.maps[0].above,
        tilesBelow = ld.maps[0].below;

    this.setLevel = function(n) {
        tilesAbove = ld.maps[n].above;
        tilesBelow = ld.maps[n].below;
    };

    this.canMoveTo = function(x, y) {
        if (y < 0 || y > tilesBelow.length - 1) {
            return false;
        }
        if (x < 0 || x > tilesBelow[y].length - 1) {
            return false;
        }
        return tilesBelow[y][x] === 5;
    };

    this.render = function(view) {

        var x,
            y,
            dx = 0,
            dy = 0;

        for (y = 0; y < tilesAbove.length; y++) {
            for (x = 0; x < tilesAbove[y].length; x++) {
                dx = x * 60 + 40;
                dy = y * 60 + 30;
                if (view === 'above') {
                    ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesAbove[y][x] - 1) * 60, 0, 60, 60, dx, dy, 60, 60);
                } else {
                    ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesBelow[y][x] - 1) * 60, 0, 60, 60, dx, dy, 60, 60);
                }
            }
        }

    };

};