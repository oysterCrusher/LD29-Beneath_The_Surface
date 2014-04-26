ld.Player = function() {

    var x = 3,
        y = 10;

    this.moveLeft = function() {
        if (ld.map.canMoveTo(x-1, y)) {
            x--;
            return true;
        }
        return false;
    };

    this.moveRight = function() {
        if (ld.map.canMoveTo(x+1, y)) {
            x++;
            return true;
        }
        return false;
    };

    this.moveUp = function() {
        if (ld.map.canMoveTo(x, y-1)) {
            y--;
            return true;
        }
        return false;
    };

    this.moveDown = function() {
        if (ld.map.canMoveTo(x, y+1)) {
            y++;
            return true;
        }
        return false;
    };

    this.render = function() {
        ld.ctx.drawImage(ld.cache.sprites['player'], 60, 0, 60, 60, x * 60 + 40, y * 60 + 30, 60, 60);
    };

};