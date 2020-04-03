import { Character } from './Character.js';
import { Scene } from './Scene.js';
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.imgBackground = new Image();
        this.lastLoop = new Date();
        this.characters = [];
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Character("cat", { x: 200, y: 400 });
        for (var i = 0; i < 2; i++)
            this.characters.push(new Character("white_collar", { x: Math.random() * 500, y: 100 }));
        this.imgBackground.src = "./background_francois.png";
        // this.imgBackground.src = "./fond_coeur.png";
    }
    Game.prototype.liveCharacter = function (character) {
        character.live();
        var infoPosition = this.scene.getGoodPositionScore(character);
        character.onFloor = infoPosition.onFloor;
        if (character.onFloor)
            character.angle = infoPosition.angle;
        character.position.x += infoPosition.x;
        character.position.y += infoPosition.y;
    };
    Game.prototype.removeCharacter = function (character) {
        console.log("removed");
        var i = this.characters.indexOf(character);
        this.characters.splice(i, 1);
    };
    Game.prototype.logic = function () {
        for (var _i = 0, _a = this.characters; _i < _a.length; _i++) {
            var character = _a[_i];
            if (character.name == "white_collar")
                if (Math.abs(this.dede.position.x - character.position.x) < 32 &&
                    Math.abs((this.dede.position.y - 48) - character.position.y) < 60 &&
                    this.dede.isFalling()) {
                    this.characters.push(new Character("gauchiste", character.position));
                    this.removeCharacter(character);
                    this.dede.forceJump();
                    break;
                }
        }
    };
    Game.prototype.draw = function () {
        this.liveCharacter(this.dede);
        for (var _i = 0, _a = this.characters; _i < _a.length; _i++) {
            var character = _a[_i];
            this.liveCharacter(character);
        }
        this.logic();
        var camera = { x: this.dede.position.x - 640 / 4, y: this.dede.position.y - 480 / 4 };
        if (camera.x < 0)
            camera.x = 0;
        if (camera.y < 0)
            camera.y = 0;
        camera.y = Math.min(camera.y, this.scene.height - 480 / 2);
        camera.x = Math.min(camera.x, this.scene.width - 640 / 2);
        var context = this.canvas.getContext("2d");
        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, 640, 480);
        context.resetTransform();
        context.translate(-camera.x, -camera.y * 2);
        context.scale(2, 2);
        context.drawImage(this.imgBackground, 0, 0);
        context.resetTransform();
        context.translate(-camera.x * 2, -camera.y * 2);
        context.scale(2, 2);
        this.scene.draw(context);
        this.dede.draw(context);
        for (var _b = 0, _c = this.characters; _b < _c.length; _b++) {
            var character = _c[_b];
            character.draw(context);
        }
        context.resetTransform();
        context.strokeStyle = "#000000";
        context.font = "20px Georgia";
        var thisLoop = new Date();
        context.strokeText((1000 / (thisLoop - this.lastLoop)).toString(), 0, 20);
        this.lastLoop = thisLoop;
    };
    Game.prototype.left = function () {
        this.dede.left();
    };
    Game.prototype.right = function () {
        this.dede.right();
    };
    Game.prototype.up = function () {
        this.dede.jump();
    };
    return Game;
}());
export { Game };
//# sourceMappingURL=Game.js.map