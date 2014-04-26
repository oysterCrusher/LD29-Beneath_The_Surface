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
        ld.ctx.fillStyle = '#100000';
        ld.ctx.fillRect(0,0,ld.canvas.width,ld.canvas.height);
    };

    function setup() {
        ld.map = new ld.Map();
        ld.person = new ld.Person();
        ld.player = new ld.Player();
        ld.blocks = new ld.Blocks();
        ld.level = new ld.Level();
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
            ld.state.changeState('game');
        }
    }

};