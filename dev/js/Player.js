ld.Player = function() {

    var x = 2,
        y = 10;

    this.render = function() {
        ld.ctx.drawImage(ld.cache.sprites['player'], 60, 0, 60, 60, x * 60 + 40, y * 60 + 30, 60, 60);
    }

};