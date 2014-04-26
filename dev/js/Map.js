ld.Map = function() {

    var tilesAbove = ld.maps[0].above,
        tilesBelow = ld.maps[0].below,
        aboveIsVisible = false,
        belowIsVisible = true;

    this.render = function() {

        var x,
            y,
            dx = 0,
            dy = 0;

        for (y = 0; y < tilesAbove.length; y++) {
            for (x = 0; x < tilesAbove[y].length; x++) {
                dx = x * 60 + 40;
                dy = y * 60 + 30;
                if (aboveIsVisible) {
                    ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesAbove[y][x] - 1) * 60, 0, 60, 60, dx, dy, 60, 60);
                }
                if (belowIsVisible) {
                ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesBelow[y][x] - 1) * 60, 0, 60, 60, dx, dy, 60, 60);
                }
            }
        }

    };

};