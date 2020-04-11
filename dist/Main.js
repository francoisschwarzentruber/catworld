import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";
var keyBoardKeys = [];
function load() {
    var canvas = document.getElementById("canvas");
    var g = new Game(canvas, new URL(window.location.href).searchParams.get("id"));
    function handleKeys() {
        if (keyBoardKeys[37])
            if (keyBoardKeys[37])
                g.left();
        if (keyBoardKeys[39])
            g.right();
        if (keyBoardKeys[38])
            g.up();
    }
    function handleGamePad(gamePad) {
        if (gamePad == null)
            return;
        if (gamePad.axes) {
            if (gamePad.axes[6] < 0)
                g.left();
            if (gamePad.axes[6] > 0)
                g.right();
        }
        if (gamePad.buttons) {
            if (gamePad.buttons[1].pressed)
                g.up();
            if (gamePad.buttons[0].pressed)
                g.action();
        }
    }
    (function animloop() {
        window.requestAnimationFrame(animloop);
        handleKeys();
        gamePadHandler(handleGamePad);
        g.draw();
        //should be outside animLoop, but when outside, it does not work
        window.onkeydown = function (evt) {
            keyBoardKeys[evt.keyCode] = evt.keyCode;
            if (evt.keyCode == 32)
                g.action();
        };
        window.onkeyup = function (evt) { keyBoardKeys[evt.keyCode] = false; };
    })();
}
window.onload = load;
//# sourceMappingURL=Main.js.map