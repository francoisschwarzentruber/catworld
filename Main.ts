import { Game } from "./src/Game.js";

function load() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let g = new Game(canvas);

    (function animloop() {
        window.requestAnimationFrame(animloop);
        g.draw();
    })();

    window.onkeydown = function(evt: KeyboardEvent) {
        if(evt.key == "ArrowLeft") g.left();
        if(evt.key == "ArrowRight") g.right();
        if(evt.key == "ArrowUp") g.up();
    }
}

load();

