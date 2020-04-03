import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";
var keys = [];
function load() {
    var canvas = document.getElementById("canvas");
    var g = new Game(canvas);
    function handleKeys() {
        if (keys[37])
            g.left();
        if (keys[39])
            g.right();
        if (keys[38])
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
    })();
    window.onkeydown = function (evt) { keys[evt.keyCode] = evt.keyCode; };
    window.onkeyup = function (evt) { keys[evt.keyCode] = false; };
}
load();
//# sourceMappingURL=Main.js.map