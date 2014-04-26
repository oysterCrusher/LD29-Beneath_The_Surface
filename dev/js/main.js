var ld = ld || {};

window.onload = function() {

    ld.canvas = document.getElementById('gameCanvas');
    ld.canvas.width = 1280;
    ld.canvas.height = 720;
    ld.ctx = ld.canvas.getContext('2d');
    ld.container = document.getElementById('gameContainer');

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    }

    ld.ctx.fillStyle = '#000000';
    ld.ctx.fillRect(0,0,ld.canvas.width,ld.canvas.height);

    ld.state = new ld.State();
    ld.state.start();

};