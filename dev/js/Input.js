ld.Input = function() {

    var wasPressed = {};
//        mouse = {
//            wasClicked: false,
//            x: 0,
//            y: 0
//        };

    this.start = function() {
        bindKeyboard();
//        bindMouse();
    };

    this.wasPressed = function(keyCode) {
        var r = false;
        if (wasPressed.hasOwnProperty(keyCode)) {
            r = wasPressed[keyCode];
            wasPressed[keyCode] = false;
        }
        return r;
    };

//    this.getMouse = function() {
//        var r = {
//            wasClicked: mouse.wasClicked,
//            x: mouse.x,
//            y: mouse.y
//        };
//        mouse.wasClicked = false;
//        return r;
//    };

    this.clear = function() {
        wasPressed = {};
//        mouse = {
//            wasClicked: false,
//            x: 0,
//            y: 0
//        };
    };

    function bindKeyboard() {
        window.addEventListener('keydown', onKeyDown, false);
    }

    function onKeyDown(evt) {
        wasPressed[evt.keyCode] = true;
    }

//    function bindMouse() {
//        ld.canvas.addEventListener('mousedown', onMouseDown, false);
//    }
//
//    function onMouseDown(evt) {
//        mouse.wasClicked = true;
//        mouse.x = evt.pageX - evt.target.getBoundingClientRect().left;
//        mouse.y = evt.pageY - evt.target.getBoundingClientRect().top;
//    }

};