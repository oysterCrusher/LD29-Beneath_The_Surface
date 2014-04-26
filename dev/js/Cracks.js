ld.Cracks = function() {

    var cracks = [];

    this.setLevel = function(n) {
        cracks = [];
        for (var i = 0; i < ld.maps[n].cracks.length; i++) {
            addCrack(ld.maps[n].cracks[i][0], ld.maps[n].cracks[i][1]);
        }
    };

    function addCrack(x, y) {
        cracks.push(new ld.Crack(x, y));
    }

    this.isCrackAt = function(x, y) {
        var r = false;
        for (var i = 0; i < cracks.length; i++) {
            if (cracks[i].x === x && cracks[i].y === y) {
                r = true;
            }
        }
        return r;
    };

    this.render = function(v) {
        for (var i = 0; i < cracks.length; i++) {
            cracks[i].render(v);
        }
    };

};


ld.Crack = function(x, y) {

    this.x = x;

    this.y = y;

    this.render = function(view) {
        if (view === 'below') {
            ld.ctx.drawImage(ld.cache.sprites['crack_below'], 0, 0, 60, 60, this.x * 60 + 40, this.y * 60 + 30, 60, 60);
        } else {
            ld.ctx.drawImage(ld.cache.sprites['crack_above'], 0, 0, 60, 60, this.x * 60 + 40, this.y * 60 + 30, 60, 60);
        }
    };

};