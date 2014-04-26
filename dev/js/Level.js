ld.Level = function() {

    var levelNumber = 0;

    this.loadLevel = function(n) {
        levelNumber = n;
        ld.map.setLevel(n);
        ld.blocks.setLevel(n);
    };

    this.update = function() {
        ld.player.update();
    };

    this.render = function() {
        ld.map.render();
        ld.blocks.render();
        ld.player.render();
    };

};