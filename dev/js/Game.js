ld.Game = function() {

    this.enter = function() {
        console.log('entering game state');
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