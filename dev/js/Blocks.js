ld.Blocks = function() {

    var blocks =[];

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
                return true;
            }
        }
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

    this.render = function() {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].render();
        }
    };

};

ld.Block = function(x, y) {

    this.x = x;

    this.y = y;

    this.render = function() {
        ld.ctx.drawImage(ld.cache.sprites['block'], 0, 0, 60, 60, this.x * 60 + 40, this.y * 60 + 30, 60, 60);
    }

};