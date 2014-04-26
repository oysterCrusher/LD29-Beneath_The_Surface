ld.Blocks = function() {

    var blocks = [];

    this.setLevel = function(n) {
        blocks = [];
        for (var i = 0; i < ld.maps[n].blocks.length; i++) {
            addBlock(ld.maps[n].blocks[i][0], ld.maps[n].blocks[i][1]);
        }
    };

    function addBlock(x, y) {
        blocks.push(new ld.Block(x, y));
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

ld.Block = function(x, y) {

    var history = [
        [x, y]
    ];

    this.x = x;

    this.y = y;

    this.advance = function() {
        history.push([this.x, this.y]);
    };

    this.retreat = function() {
        this.x = history[history.length - 2][0];
        this.y = history[history.length - 2][1];
        history.pop();
    };

    this.render = function(view) {
        if (view === 'below') {
            ld.ctx.drawImage(ld.cache.sprites['block'], 0, 0, 60, 60, this.x * 60 + 40, this.y * 60 + 30, 60, 60);
        }
    }

};