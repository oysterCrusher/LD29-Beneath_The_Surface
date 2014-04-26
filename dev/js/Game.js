ld.Game = function() {

    this.enter = function() {
        console.log('entering game state');
    };

    this.exit = function() {

    };

    this.update = function(dt) {

    };

    this.render = function() {
        ld.map.render();
        ld.person.render();
    };

};