import { PhysicalObject } from './PhysicalObject.js';
import { Scene } from './Scene.js';
import { Heart } from './Heart.js';
import { Character } from './Character.js';
import { Music } from './Music.js';
import { NPC } from './NPC.js';
import { Sound } from './Sound.js';
import { ImageLoader } from './ImageLoader.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Character;
    private scene: Scene;
    private imgBackground = new Image();
    private lastLoop: Date = new Date();
    private characters = [];
    private hearts = [];
    private clippingFactor = 0;
    private win: boolean = false;
    private lost: boolean = false;
    private lifepoints = 7;
    private hurt = 0;

    constructor(canvas: HTMLCanvasElement, name: string) {
        Music.play("music");
        this.canvas = canvas;
        this.scene = new Scene(name);
        this.dede = new Character("cat", 48, { x: 200, y: this.scene.height / 2 });
        for (let i = 0; i < 40; i++)
            this.characters.push(new NPC("white_collar", 48, { x: 400 + Math.random() * 2500, y: 200 }));

        this.imgBackground = ImageLoader.get(name + "_background");
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

    removeHeart(heart) {
        let i = this.hearts.indexOf(heart);
        this.hearts.splice(i, 1);
    }


    logic() {
        if (this.hurt > 0) {
            this.hurt++;
            if (this.hurt > 30)
                this.hurt = 0;
        }



        for (let character of this.characters) {
            if (character.name == "white_collar")
                if (PhysicalObject.intersect(this.dede, character)) {
                    Sound.play("hurt");
                    this.hurt = 1;
                    break;
                }
        }

        for (let heart of this.hearts) {
            for (let character of this.characters)
                if (character.name == "white_collar") {
                    if (PhysicalObject.intersect(heart, character)) {
                        console.log("un white_collar doit mourir");
                        Sound.play("oh");
                        this.characters.push(new NPC("gauchiste", 48, character.position));
                        this.removeCharacter(character);
                        this.removeHeart(heart);
                    }
                }
        }


        if (this.dede.position.y > this.scene.height && !this.lost) {
            this.lost = true;
            Sound.play("gameover");
            Music.stop();
        }
        if (this.dede.position.x + this.dede.size > this.scene.width - 3 && !this.win) {
            this.win = true;
            Sound.play("win");
            Music.stop();
        }


    }



    drawClippingThatsAllFolks(context) {
        if (this.clippingFactor < 0) this.clippingFactor = 0;
        if (this.clippingFactor < 1) {
            context.save();
            context.beginPath();
            context.arc(this.dede.position.x, this.dede.position.y, this.clippingFactor * 400, 0, Math.PI * 2);
            context.clip();
        }
    }



    draw() {
        if (!ImageLoader.isAllLoaded()) return;

        if (!this.win) {
            this.liveCharacter(this.dede);
            for (let character of this.characters)
                this.liveCharacter(character);

            for (let heart of this.hearts)
                heart.live();
            this.logic();
        }


        let camera = { x: this.dede.position.x - 640 / 4, y: this.dede.position.y - 480 / 4 };
        if (camera.x < 0) camera.x = 0;
        if (camera.y < 0) camera.y = 0;

        camera.y = Math.min(camera.y, this.scene.height - 480 / 2);
        camera.x = Math.min(camera.x, this.scene.width - 640 / 2);

        let context = this.canvas.getContext("2d");
        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, 640, 480);

        context.resetTransform();
        context.translate(-camera.x * 2, -camera.y * 2);
        context.scale(2, 2);

        this.drawClippingThatsAllFolks(context);

        if (this.win || this.lost) {
            this.clippingFactor -= 0.01;
            if (this.clippingFactor < 0.1) {
                GOTOURL.goto("index.html");
            }

        }
        else {
            this.clippingFactor += 0.01;
            if (this.clippingFactor > 1)
                this.clippingFactor = 1;
        }

        if (this.hurt > 0)
            context.filter = 'grayscale(1.0)'
        else
            context.filter = "none";

        context.drawImage(this.imgBackground, camera.x / 2, camera.y / 2);


        this.scene.draw(context);

        for (let character of this.characters)
            character.draw(context);

        for (let heart of this.hearts)
            heart.draw(context);

        this.dede.draw(context);

        context.restore();
        context.resetTransform();
        context.strokeStyle = "#000000";
        context.font = "20px Georgia";


        for (let i = 0; i < this.lifepoints; i++)
            context.drawImage(ImageLoader.get("lifepoint"), 16 * i, 0, 16, 16);
        /*     let thisLoop = new Date();
             context.strokeText((1000 / (<any>thisLoop - <any>this.lastLoop)).toString(), 0, 20);
     
             this.lastLoop = thisLoop;*/
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

    action() {
        Sound.play("heartlaunch");
        this.hearts.push(new Heart(this.dede.position, this.dede.direction));
    }
}








class GOTOURL {
    static url = undefined;

    static goto(url) {
        if (this.url != url)
            document.location.href = url;
        this.url = url;
    }
}