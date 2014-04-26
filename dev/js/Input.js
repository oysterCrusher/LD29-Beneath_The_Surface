ld.Input = function() {

    var wasPressed = {
        left: false,
        right: false,
        up: false,
        down: false
    };

    this.start = function() {
        console.log('binding keyboard');
        bindKeyboard();
    };

    this.wasPressed = function(keyName) {
        var r = wasPressed[keyName];
        wasPressed[keyName] = false;
        return r;
    };

    this.clear = function() {
        wasPressed = {
            left: false,
            right: false,
            up: false,
            down: false
        }
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

};