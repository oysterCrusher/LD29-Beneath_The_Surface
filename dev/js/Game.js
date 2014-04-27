ld.Game = function() {

    this.enter = function() {

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