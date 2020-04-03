import { Vector2DUtility } from './Vector2D.js';
import { Character } from './Character.js';
import { Scene } from './Scene.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Character;
    private scene: Scene;
    private imgBackground = new Image();

    private characters = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Character("cat", { x: 300, y: 100 });
        this.characters.push(new Character("white_collar", { x: 400, y: 100 }));
        this.characters.push(new Character("white_collar", { x: 450, y: 200 }));

        this.imgBackground.src = "./fond_coeur.png";
    }


    liveCharacter(character) {
        character.live();

        const infoPosition = this.scene.getGoodPositionScore(character);
        character.onFloor = infoPosition.onFloor;

        if (character.onFloor)
            character.angle = infoPosition.angle;

        character.position.x += infoPosition.x;
        character.position.y += infoPosition.y;


    }


    removeCharacter(character) {
        console.log("removed");
        let i = this.characters.indexOf(character);
        this.characters.splice(i, 1);
    }


    logic() {
        for (let character of this.characters) {
            if(character.name == "white_collar")
            if (Math.abs(this.dede.position.x - character.position.x) < 32 &&
                Math.abs((this.dede.position.y - 48) - character.position.y) < 60 &&
                this.dede.isFalling()) {
                this.characters.push(new Character("gauchiste", character.position));
                this.removeCharacter(character);
                break;
            }


        }


    }

    draw() {

        this.liveCharacter(this.dede);
        for (let character of this.characters)
            this.liveCharacter(character);

        this.logic();

        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, 640, 480);

        context.resetTransform();
        context.translate(-this.dede.position.x + 640 / 2, -this.dede.position.y + 480 / 2);
        context.scale(2, 2);

        context.drawImage(this.imgBackground, 0, 0);


        context.resetTransform();
        context.translate(-this.dede.position.x * 2 + 640 / 2, -this.dede.position.y * 2 + 480 / 2);
        context.scale(2, 2);

        this.scene.draw(context);
        this.dede.draw(context);

        for (let character of this.characters)
            character.draw(context);

        context.resetTransform();
        context.strokeStyle = "#000000";
        context.font = "20px Georgia";
        context.strokeText(this.dede.angle.toString(), 0, 20);

    }



    left() {
        this.dede.left();
    }



    right() {
        this.dede.right();
    }

    up() {
        this.dede.jump();
    }
}