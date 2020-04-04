import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";


let keyBoardKeys = [];



function load() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let g = new Game(canvas, "karine");


    function handleKeys() {
        if (keyBoardKeys[37]) console.log("left");
        if (keyBoardKeys[37]) g.left();
        if (keyBoardKeys[39]) g.right();
        if (keyBoardKeys[38]) g.up();
        if (keyBoardKeys[22]) g.action();
    }

    function handleGamePad(gamePad: Gamepad) {
        
        if (gamePad.axes[6] < 0) g.left();
        if (gamePad.axes[6] > 0) g.right();
        if (gamePad.buttons[1].pressed) g.up();
        if (gamePad.buttons[0].pressed) g.action();
    }

    (function animloop() {
        window.requestAnimationFrame(animloop);
        handleKeys();
        gamePadHandler(handleGamePad);
        g.draw();

        //should be outside animLoop, but when outside, it does not work
        window.onkeydown = function (evt: KeyboardEvent) { keyBoardKeys[evt.keyCode] = evt.keyCode; console.log(evt.keyCode) }
        window.onkeyup = function (evt: KeyboardEvent) { keyBoardKeys[evt.keyCode] = false; console.log(evt.keyCode) }


    })();


}



window.onload = load;

