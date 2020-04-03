import { Vector2DUtility } from './Vector2D.js';
import { Character } from './Character.js';
import { Scene } from './Scene.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Character;
    private scene: Scene;
    private imgBackground = new Image();
    private lastLoop : Date = new Date();
    private characters = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Character("cat", { x: 200, y: 400 });
            for(let i = 0; i<2 ; i++)
                this.characters.push(new Character("white_collar", { x: Math.random()*500, y: 100 }));

        this.imgBackground.src = "./background_francois.png";
       // this.imgBackground.src = "./fond_coeur.png";
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


    }

    draw() {

        this.liveCharacter(this.dede);
        for (let character of this.characters)
            this.liveCharacter(character);

        this.logic();

        let camera = { x: this.dede.position.x - 640 / 4, y: this.dede.position.y - 480 / 4 };
        if (camera.x < 0) camera.x = 0;
        if (camera.y < 0) camera.y = 0;

        camera.y = Math.min(camera.y, this.scene.height - 480 /2);
        camera.x = Math.min(camera.x, this.scene.width - 640 /2);

        let context = this.canvas.getContext("2d");
        context.imageSmoothingEnabled= false;
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

        for (let character of this.characters)
            character.draw(context);

        context.resetTransform();
        context.strokeStyle = "#000000";
        context.font = "20px Georgia";

        let thisLoop = new Date();
        context.strokeText((1000 / (<any>thisLoop - <any>this.lastLoop)).toString(), 0, 20);

        this.lastLoop = thisLoop;
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