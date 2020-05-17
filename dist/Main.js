import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";
import { ImageLoader } from "./src/ImageLoader.js";
var keyBoardKeys = [];
var fps, fpsInterval, startTime, now, then, elapsed;
function startGame(imgForeGround, imgBackGround) {
    document.getElementById("titlescreen").setAttribute("class", "hidden");
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("class", "e");
    var g = new Game(canvas, imgForeGround, imgBackGround);
    // new URL(window.location.href).searchParams.get("id")
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
    function animloop() {
        window.requestAnimationFrame(animloop);
        now = Date.now();
        elapsed = now - then;
        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here
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
        }
    }
    ;
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animloop();
    }
    startAnimating(30);
}
function startGameWithName(name) {
    startGame(ImageLoader.get(name + "_scene"), ImageLoader.get(name + "_background"));
}
function startGameUpload(img) {
    startGame(img, undefined);
}
function load() {
    var levelButtons = document.getElementsByTagName("img");
    var _loop_1 = function (i) {
        levelButtons[i].addEventListener("click", function () { return startGameWithName(levelButtons[i].id); });
    };
    for (var i = 0; i < levelButtons.length; i++) {
        _loop_1(i);
    }
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img_1 = new Image(); //document.querySelector('img');  // $('img')[0]
            img_1.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img_1.onload = function () { return startGameUpload(img_1); };
        }
    });
    document.getElementById("upload").addEventListener("click", startGameUpload);
}
window.onload = load;
//# sourceMappingURL=Main.js.map