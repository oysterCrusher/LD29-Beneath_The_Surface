ld.Game = function() {

    var level = 0;

    this.enter = function() {
        console.log('entering game state');
        ld.level.loadLevel(0);
    };

    this.exit = function() {

    };

    this.update = function(dt) {

    };

    this.render = function() {
        ld.level.render();
//        ld.map.render();
//        ld.player.render();
//        ld.person.render();
    };

};