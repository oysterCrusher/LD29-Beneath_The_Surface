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

        currentState = states.loader;
        currentState.enter();

        this.rafUpdate(0);

    };

    this.changeState = function(newState) {
        currentState.exit();
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