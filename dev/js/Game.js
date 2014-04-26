ld.Game = function() {

    this.enter = function() {
        ld.level.loadLevel(0);
    };

    this.exit = function() {

    };

    this.update = function() {
        ld.level.update();
    };

    this.render = function() {
        ld.level.render();
    };

};