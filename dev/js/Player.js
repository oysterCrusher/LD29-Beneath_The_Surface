ld.Player = function() {

    var x = 3,
        y = 10,
        d = [0, 0],
        history = [];

    this.setLevel = function(n) {
        x = ld.maps[n].persons[0][0];
        y = ld.maps[n].persons[0][1];
        this.advance();
    };

    this.advance = function() {
        history.push([x, y]);
        d = ld.map.getDFromT(x, y);
    };

    this.retreat = function() {
        x = history[history.length - 2][0];
        y = history[history.length - 2][1];
        history.pop();
        d = ld.map.getDFromT(x, y);
    };

    this.move = function(dx, dy) {

        var xp = x + dx,
            yp = y + dy;

        if (xp !== x && yp !== y) {
            console.log('Warning: can only move in one direction at a time');
            return;
        }

        while (ld.blocks.isBlockAt(xp, yp)) {
            xp += dx;
            yp += dy;
        }
        if (ld.map.canMoveTo(xp, yp)) {
            xp -= dx;
            yp -= dy;
            while (ld.blocks.isBlockAt(xp, yp)) {
                ld.blocks.moveBlock(xp, yp, dx, dy);
                xp -= dx;
                yp -= dy;
            }
            x += dx;
            y += dy;
            return true;
        }
        return false;
    };

    this.render = function(view) {
        if (view === 'below') {
            ld.ctx.drawImage(ld.cache.sprites['player'], 0, 0, 60, 60, d[0], d[1], 60, 60);
        }
    };

};