var ld = ld || {};

ld.State = function() {

    var states = {},
        currentState = null,
        lastT = 0,
        dt = 0,
        _this = this;

    this.start = function() {

        // Create all the states
        states.loader = new ld.Loader();
        states.mainMenu = new ld.MainMenu();
        states.game = new ld.Game();
        states.win = new ld.Win();
        states.lose = new ld.Lose();

        currentState = states.loader;
        currentState.enter();

        ld.input.start();

        this.rafUpdate(0);

    };

    this.changeState = function(newState) {
        currentState.exit();
        ld.input.clear();
        currentState = states[newState];
        currentState.enter();
    };

    this.rafUpdate = function(t) {
        window.requestAnimationFrame(_this.rafUpdate);
        dt = t - lastT;
        lastT = t;
        dt = Math.min(dt, 100);
        currentState.update(dt);
        currentState.render();
    };

};