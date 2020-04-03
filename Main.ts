import { Game } from "./src/Game.js";
import {gamePadHandler} from "./src/Gamepad.js";


let keyBoardKeys = [];



function load() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let g = new Game(canvas, "francois");


    function handleKeys() {
        if (keyBoardKeys[37]) console.log("left");
        if (keyBoardKeys[37]) g.left();
        if (keyBoardKeys[39]) g.right();
        if (keyBoardKeys[38]) g.up();
    }

    function handleGamePad(gamePad: Gamepad) {
            if(gamePad.buttons[1].pressed) g.up();
            if(gamePad.axes[6] < 0) g.left();
            if(gamePad.axes[6] > 0) g.right();
     }

    (function animloop() {
        window.requestAnimationFrame(animloop);
        handleKeys();
        gamePadHandler(handleGamePad);
        g.draw();
    })();

    window.onkeydown = function (evt: KeyboardEvent) { keyBoardKeys[evt.keyCode] = evt.keyCode; console.log(evt.keyCode) }
    window.onkeyup = function (evt: KeyboardEvent) { keyBoardKeys[evt.keyCode] = false; }

}




load();

