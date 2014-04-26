ld.Persons = function() {

    var persons = [];

    this.setLevel = function(n) {
        persons = [];
        for (var i = 0; i < ld.maps[n].persons.length; i++) {
            addPerson(ld.maps[n].persons[i]);
        }
    };

    function addPerson(p) {
        persons.push(new ld.Person(p));
    }

    this.advance = function() {
        for (var i = 0; i < persons.length; i++) {
            persons[i].advance();
        }
    };

    this.render = function() {
        for (var i = 0; i < persons.length; i++) {
            persons[i].render();
        }
    };

};


ld.Person = function(path) {

    var progress = 0,
        subprogress = 0,
        substeps = 3;

    console.log(path);
    console.log(path[Math.floor(progress)][0]);

    this.advance = function() {
        subprogress += 1;
        if (subprogress >= substeps) {
            progress++;
            subprogress -= substeps;
        }

        // Check to see if we fall through a crack
        var cTileX =  path[progress][0] + Math.round(subprogress / substeps) * (path[progress+1][0] - path[progress][0]),
            cTileY =  path[progress][1] + Math.round(subprogress / substeps) * (path[progress+1][1] - path[progress][1]);
        if (ld.cracks.isCrackAt(cTileX, cTileY)) {
            console.log('stepping on a crack');
            if (ld.blocks.isBlockAt(cTileX, cTileY)) {
                console.log('saved by the block');
            } else {
                console.log('fell through the floor');
            }
        }

        if (progress >= path.length - 2) {
            ld.level.completed();
        }
    };

    this.render = function() {
        var tx = path[progress][0] + (subprogress / substeps) * (path[progress+1][0] - path[progress][0]),
            ty = path[progress][1] + (subprogress / substeps) * (path[progress+1][1] - path[progress][1]);

        ld.ctx.globalAlpha = 0.3;
        ld.ctx.drawImage(ld.cache.sprites['person'], 60, 0, 60, 60, tx * 60 + 40, ty * 60 + 30, 60, 60);
        ld.ctx.globalAlpha = 1.0;
    }

};