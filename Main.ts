import { Game } from "./src/Game.js";
import { gamePadHandler } from "./src/Gamepad.js";
import { ImageLoader } from "./src/ImageLoader.js";


let keyBoardKeys = [];
let screenButton = { left: false, right: false };
let fps, fpsInterval, startTime, now, then, elapsed;





function startGame(imgForeGround, imgBackGround) {
    document.getElementById("titlescreen").setAttribute("class", "hidden");

    document.getElementById("game").setAttribute("class", "e");
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");

    let g = new Game(canvas, imgForeGround, imgBackGround);
    // new URL(window.location.href).searchParams.get("id")


    document.getElementById("left").addEventListener("touchstart",
        () => { screenButton.left = true; screenButton.right = false; });
    document.getElementById("left").addEventListener("touchend",
        () => { screenButton.left = false; screenButton.left = false; });
    document.getElementById("left").addEventListener("touchcancel",
        () => { screenButton.left = false; screenButton.left = false; });
    document.getElementById("right").addEventListener("touchstart", 
    () => { screenButton.left = false; screenButton.right = true });
    document.getElementById("right").addEventListener("touchend", 
    () => { screenButton.left = false; screenButton.right = false });
    document.getElementById("jump").addEventListener("touchstart", () => g.up());
    document.getElementById("action").addEventListener("touchstart", () => g.action());

    function handleKeys() {
        if (keyBoardKeys[37])
            if (keyBoardKeys[37]) g.left();
        if (keyBoardKeys[39]) g.right();
        if (keyBoardKeys[38]) g.up();
    }



    function handleScreenButton() {
        if (screenButton.left) g.left();
        if (screenButton.right) g.right();
    }


    function handleGamePad(gamePad: Gamepad) {
        if (gamePad == null) return;

        if (gamePad.axes) {
            if (gamePad.axes[6] < 0) g.left();
            if (gamePad.axes[6] > 0) g.right();
        }

        if (gamePad.buttons) {
            if (gamePad.buttons[1].pressed) g.up();
            if (gamePad.buttons[0].pressed) g.action();

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
            handleScreenButton();
            gamePadHandler(handleGamePad);
            g.draw();

            //should be outside animLoop, but when outside, it does not work
            window.onkeydown = function (evt: KeyboardEvent) {
                keyBoardKeys[evt.keyCode] = evt.keyCode;
                if (evt.keyCode == 32) g.action();
            }
            window.onkeyup = function (evt: KeyboardEvent) { keyBoardKeys[evt.keyCode] = false; }
        }

    };


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
    let levelButtons = document.getElementsByTagName("img")
    for (let i = 0; i < levelButtons.length; i++) {
        levelButtons[i].addEventListener("click", () => startGameWithName(levelButtons[i].id))
    }


    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            let img = new Image();//document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = () => startGameUpload(img);
        }
    });
    document.getElementById("upload").addEventListener("click", startGameUpload);



}

window.onload = load;

