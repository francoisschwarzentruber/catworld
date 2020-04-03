import { Game } from "./src/Game.js";

let keys = [];



function load() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let g = new Game(canvas);


    function handleKeys() {
        if (keys[37]) g.left();
        if (keys[39]) g.right();
        if (keys[38]) g.up();
    }

    (function animloop() {
        window.requestAnimationFrame(animloop);
        handleKeys();
        g.draw();
    })();

    window.onkeydown = function (evt: KeyboardEvent) { keys[evt.keyCode] = evt.keyCode; }
    window.onkeyup = function (evt: KeyboardEvent) { keys[evt.keyCode] = false; }

}




load();

