var ld = ld || {};

ld.Loader = function() {

    var nSpritesToLoad = 0,
        nSpritesLoaded = 0;

    this.enter = function() {

        setup();

        loadSprites();

    };

    this.exit = function() {

    };

    this.update = function() {

    };

    this.render = function() {
        ld.ctx.fillStyle = '#000000';
        ld.ctx.fillRect(0, 0, ld.canvas.width, ld.canvas.height);
    };

    function setup() {
        ld.hasLocalStorage = typeof(localStorage) !== "undefined";

        ld.progress = [];
        loadProgress();

        ld.map = new ld.Map();
        ld.persons = new ld.Persons();
        ld.player = new ld.Player();
        ld.blocks = new ld.Blocks();
        ld.level = new ld.Level();
        ld.input = new ld.Input();
    }

    function loadSprites() {
        ld.cache = {
            sprites: []
        };

        nSpritesToLoad = ld.assetList.sprites.length;

        for (var i = 0; i < nSpritesToLoad; i++) {
            ld.cache.sprites[ld.assetList.sprites[i].name] = new Image();
            ld.cache.sprites[ld.assetList.sprites[i].name].onload = onSpriteLoad;
            ld.cache.sprites[ld.assetList.sprites[i].name].src = ld.assetList.sprites[i].url;

        }
    }

    function onSpriteLoad() {
        nSpritesLoaded++;
        if (nSpritesLoaded === nSpritesToLoad) {
            ld.state.changeState('mainMenu');
        }
    }

    function loadProgress() {
        var p = 0;
        for (var i = 0; i < ld.maps.length; i++) {
            p = 0;

            if (ld.hasLocalStorage) {
                if (localStorage.getItem('ldp' + i.toString()) !== null) {
                    p = localStorage.getItem('ldp' + i.toString());
                    ld.progress.push(parseInt(p));
                } else {
                    ld.progress.push(0);
                }
            } else {
                ld.progress.push(0);
            }
        }
    }

};