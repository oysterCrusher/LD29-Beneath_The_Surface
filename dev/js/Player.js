ld.Player = function() {

    var x = 3,
        y = 10,
        history = [];

    this.setLevel = function(n) {
        x = ld.maps[n].persons[0][0];
        y = ld.maps[n].persons[0][1];
        history = [
            [x, y]
        ];
    };

    this.advance = function() {
        history.push([x, y]);
    };

    this.retreat = function() {
        x = history[history.length - 2][0];
        y = history[history.length - 2][1];
        history.pop();
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
            ld.ctx.drawImage(ld.cache.sprites['player'], 0, 0, 60, 60, x * 60 + 40, y * 60 + 30, 60, 60);
        }
    };

};