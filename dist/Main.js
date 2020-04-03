import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";
var keyBoardKeys = [];
function load() {
    var canvas = document.getElementById("canvas");
    var g = new Game(canvas, "francois");
    function handleKeys() {
        if (keyBoardKeys[37])
            console.log("left");
        if (keyBoardKeys[37])
            g.left();
        if (keyBoardKeys[39])
            g.right();
        if (keyBoardKeys[38])
            g.up();
    }
    function handleGamePad(gamePad) {
        if (gamePad.buttons[1].pressed)
            g.up();
        if (gamePad.axes[6] < 0)
            g.left();
        if (gamePad.axes[6] > 0)
            g.right();
    }
    (function animloop() {
        window.requestAnimationFrame(animloop);
        handleKeys();
        gamePadHandler(handleGamePad);
        g.draw();
        //should be outside animLoop, but when outside, it does not work
        window.onkeydown = function (evt) { keyBoardKeys[evt.keyCode] = evt.keyCode; console.log(evt.keyCode); };
        window.onkeyup = function (evt) { keyBoardKeys[evt.keyCode] = false; console.log(evt.keyCode); };
    })();
}
window.onload = load;
//# sourceMappingURL=Main.js.map