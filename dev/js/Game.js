ld.Game = function() {

    var transTimer = 0,
        transTime1 = 1000,
        transTime2 = 2000;

    this.enter = function() {
        transTimer = 0;
    };

    this.exit = function() {

    };

    this.update = function(dt) {
        if (transTimer < transTime2) {
            transTimer += dt;
        } else {
            ld.level.update();
        }
    };

    this.render = function() {
        if (transTimer >= transTime2) {
            ld.level.render();
        } else if (transTimer < transTime1) {
            ld.level.renderView('above');
        } else {
            ld.level.renderView('below');
            ld.ctx.globalAlpha = 1 - (transTimer - transTime1) / (transTime2 - transTime1);
            ld.level.renderView('above');
            ld.ctx.globalAlpha = 1;
        }
    };

};