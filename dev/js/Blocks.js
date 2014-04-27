ld.Blocks = function() {

    var blocks = [];

    this.setLevel = function(n) {
        blocks = [];
        for (var i = 0; i < ld.maps[n].blocks.length; i++) {
            addBlock(ld.maps[n].blocks[i][0], ld.maps[n].blocks[i][1], ld.maps[n].blocks[i][2]);
        }
    };

    function addBlock(x, y, d) {
        blocks.push(new ld.Block(x, y, d));
    }

    this.isBlockAt = function(x, y) {
        var r = false;
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].x === x && blocks[i].y === y) {
                r = true;
            }
        }
        return r;
    };

    this.moveBlock = function(x, y, dx, dy) {
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].x === x && blocks[i].y === y) {
                blocks[i].x += dx;
                blocks[i].y += dy;
                return;
            }
        }
    };

    this.getBlockDir = function(x, y) {
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].x === x && blocks[i].y === y) {
                if (blocks[i].d === 0) {
                    return [0, -1];
                } else if (blocks[i].d === 1) {
                    return [1, 0];
                } else if (blocks[i].d === 2) {
                    return [0, 1];
                } else if (blocks[i].d === 3) {
                    return [-1, 0];
                }
                return [-1, -1];
            }
        }
        return [-1, -1];
    };

    this.advance = function() {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].advance();
        }
    };

    this.retreat = function() {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].retreat();
        }
    };

    this.render = function(v) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].render(v);
        }
    };

};

ld.Block = function(x, y, d) {

    var history = [
            [x, y]
        ],
        dr = [0, 0];

    this.x = x;

    this.y = y;

    this.d = d;

    dr = ld.map.getDFromT(this.x, this.y);

    this.advance = function() {
        history.push([this.x, this.y]);
        dr = ld.map.getDFromT(this.x, this.y);
    };

    this.retreat = function() {
        this.x = history[history.length - 2][0];
        this.y = history[history.length - 2][1];
        history.pop();
        dr = ld.map.getDFromT(this.x, this.y);
    };

    this.render = function(view) {
        if (view === 'below') {
            ld.ctx.drawImage(ld.cache.sprites['block'], 60 * this.d, 0, 60, 60, dr[0], dr[1], 60, 60);
        } else if (ld.map.isHole(this.x, this.y)) {
            ld.ctx.drawImage(ld.cache.sprites['block'], 60 * this.d, 0, 60, 60, dr[0], dr[1], 60, 60);
        }
    }

};