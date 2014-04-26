ld.Input = function() {

    var wasPressed = {
            left: false,
            right: false,
            up: false,
            down: false
        },
        mouse = {
            wasClicked: false,
            x: 0,
            y: 0
        };

    this.start = function() {
        bindKeyboard();
        bindMouse();
    };

    this.wasPressed = function(keyName) {
        var r = wasPressed[keyName];
        wasPressed[keyName] = false;
        return r;
    };

    this.getMouse = function() {
        var r = {
            wasClicked: mouse.wasClicked,
            x: mouse.x,
            y: mouse.y
        };
        mouse.wasClicked = false;
        return r;
    };

    this.clear = function() {
        wasPressed = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        mouse = {
            wasClicked: false,
            x: 0,
            y: 0
        };
    };

    function bindKeyboard() {
        window.addEventListener('keydown', onKeyDown, false);
    }

    function onKeyDown(evt) {
        switch (evt.keyCode) {
            case 37: // Left
                wasPressed.left = true;
                break;
            case 39:
                wasPressed.right = true;
                break;
            case 38:
                wasPressed.up = true;
                break;
            case 40:
                wasPressed.down = true;
                break;
        }
    }

    function bindMouse() {
        window.addEventListener('mousedown', onMouseDown, false);
    }

    function onMouseDown(evt) {
        mouse.wasClicked = true;
        mouse.x = evt.pageX - evt.target.getBoundingClientRect().left;
        mouse.y = evt.pageY - evt.target.getBoundingClientRect().top;
    }

};