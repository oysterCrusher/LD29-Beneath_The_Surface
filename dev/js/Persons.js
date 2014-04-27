ld.Persons = function() {

    var persons = [];

    this.setLevel = function(n) {
        persons = [];
        for (var i = 0; i < ld.maps[n].persons.length; i++) {
            addPerson(ld.maps[n].persons[i][0], ld.maps[n].persons[i][1], ld.maps[n].persons[i][2], ld.maps[n].persons[i][3]);
        }
    };

    function addPerson(x, y, xT, yT) {
        persons.push(new ld.Person(x, y, xT, yT));
    }

    this.advance = function() {
        for (var i = 0; i < persons.length; i++) {
            persons[i].advance();
        }
    };

    this.retreat = function() {
        for (var i = 0; i < persons.length; i++) {
            persons[i].retreat();
        }
    };

    this.hasFinished = function() {
        var r = true;
        for (var i = 0; i < persons.length; i++) {
            if (!persons[i].hasFinished) {
                r = false;
            }
        }
        return r;
    };

    this.render = function(v) {
        for (var i = 0; i < persons.length; i++) {
            persons[i].render(v);
        }
    };

};


ld.Person = function(x, y, xT, yT) {

    var progress = 0,
        subprogress = 0,
        substeps = 3,
        x0 = x,
        y0 = y,
        x1 = 0,
        y1 = 0,
        target = [xT, yT],
        history = [];

    getNextTile();
    history.push([progress, subprogress, x0, y0, x1, y1]);

    this.hasFinished = false;

    this.advance = function() {

        subprogress += 1;
        if (subprogress >= substeps) {
            if (x1 === target[0] && y1 === target[1]) {
                this.hasFinished = true;
                return;
            }
            progress++;
            subprogress -= substeps;
            x0 = x1;
            y0 = y1;
            getNextTile();
        }

        history.push([progress, subprogress, x0, y0, x1, y1]);

    };

    function getNextTile() {
        var dir = ld.map.getTileDir(x0, y0);
        if (dir[0] === -1 && dir[1] === -1) {
            dir = ld.blocks.getBlockDir(x0, y0);
        }
        if (dir[0] === -1 && dir[1] === -1) {
            ld.state.changeState('lose');
        } else {
            x1 = x0 + dir[0];
            y1 = y0 + dir[1];
        }
    }

    this.retreat = function() {
        progress = history[history.length - 2][0];
        subprogress = history[history.length - 2][1];
        x0 = history[history.length - 2][2];
        y0 = history[history.length - 2][3];
        x1 = history[history.length - 2][4];
        y1 = history[history.length - 2][5];
        history.pop();
    };

    this.render = function(view) {
        var tx = x0 + (subprogress / substeps) * (x1 - x0),
            ty = y0 + (subprogress / substeps) * (y1 - y0);

        if (view === 'below') {
            ld.ctx.globalAlpha = 0.2;
        }
        ld.ctx.drawImage(ld.cache.sprites['person'], 0, 0, 60, 60, tx * 60 + 40, ty * 60 + 30, 60, 60);

        ld.ctx.globalAlpha = 1.0;
    }

};