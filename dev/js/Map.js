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
        return (tilesBelow[y][x] === 7) || (tilesBelow[y][x] === 5);
    };

    this.getTileDir = function(x, y) {
        if (tilesAbove[y][x] === 1) {
            return [0, -1];
        } else if (tilesAbove[y][x] === 2) {
            return [1, 0];
        } else if (tilesAbove[y][x] === 3) {
            return [0, 1];
        } else if (tilesAbove[y][x] === 4) {
            return [-1, 0];
        }
        return [-1, -1];
    };

    this.isHole = function(x, y) {
        return tilesAbove[y][x] === 5;
    };

    this.getDFromT = function(x, y) {
        return [Math.round(x * 60 + (1280 - tilesAbove[y].length * 60) * 0.5), Math.round(y * 60 + (720 - tilesAbove.length * 60) * 0.5)];
    };

    this.render = function(view) {

        var x,
            y,
            d = [0, 0];

        for (y = 0; y < tilesAbove.length; y++) {
            for (x = 0; x < tilesAbove[y].length; x++) {
                d = this.getDFromT(x, y);
                if (view === 'above') {
                    ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesAbove[y][x] - 1) * 60, 0, 60, 60, d[0], d[1], 60, 60);
                } else {
                    ld.ctx.drawImage(ld.cache.sprites['tiles'], (tilesBelow[y][x] - 1) * 60, 0, 60, 60, d[0], d[1], 60, 60);
                }
            }
        }

    };

};