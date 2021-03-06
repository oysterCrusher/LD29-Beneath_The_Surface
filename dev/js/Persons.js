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
        var r = false;
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].advance()) {
                r = true;
            }
        }
        return r;
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
        d0 = [0, 0],
        d1 = [0, 0],
        target = [xT, yT],
        history = [];

    getNextTile();
    history.push([progress, subprogress, x0, y0, x1, y1]);
    d0 = ld.map.getDFromT(x0, y0);
    d1 = ld.map.getDFromT(x1, y1);

    this.hasFinished = false;

    this.advance = function() {

        var r = false;

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
            r = getNextTile();
        }

        history.push([progress, subprogress, x0, y0, x1, y1]);

        d0 = ld.map.getDFromT(x0, y0);
        d1 = ld.map.getDFromT(x1, y1);

        return r;
    };

    function getNextTile() {
        var dir = ld.map.getTileDir(x0, y0);
        if (dir[0] === -1 && dir[1] === -1) {
            dir = ld.blocks.getBlockDir(x0, y0);
        }
        if (dir[0] === -1 && dir[1] === -1) {
            return true;
        } else {
            x1 = x0 + dir[0];
            y1 = y0 + dir[1];
        }
        return false;
    }

    this.retreat = function() {
        progress = history[history.length - 2][0];
        subprogress = history[history.length - 2][1];
        x0 = history[history.length - 2][2];
        y0 = history[history.length - 2][3];
        x1 = history[history.length - 2][4];
        y1 = history[history.length - 2][5];
        history.pop();
        d0 = ld.map.getDFromT(x0, y0);
        d1 = ld.map.getDFromT(x1, y1);
    };

    this.render = function(view) {
        if (this.hasFinished) {
            return;
        }

        var dx = d0[0] + (subprogress / substeps) * (d1[0] - d0[0]),
            dy = d0[1] + (subprogress / substeps) * (d1[1] - d0[1]),
            gao = ld.ctx.globalAlpha;

        if (view === 'below') {
            ld.ctx.globalAlpha = 0.2;
        }
        ld.ctx.drawImage(ld.cache.sprites['person'], 0, 0, 60, 60, dx, dy, 60, 60);

        ld.ctx.globalAlpha = gao;
    }

};