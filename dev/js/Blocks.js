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

    this.render = function() {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].render();
        }
    };

};

ld.Block = function(x, y) {

    this.render = function() {
        ld.ctx.drawImage(ld.cache.sprites['block'], 0, 0, 60, 60, x * 60 + 40, y * 60 + 30, 60, 60);
    }

};