import { PhysicalObject } from './PhysicalObject.js';
import { Scene } from './Scene.js';
import { Heart } from './Heart.js';
import { Character } from './Character.js';
import { Music } from './Music.js';
import { NPC } from './NPC.js';
import { Sound } from './Sound.js';
import { ImageLoader } from './ImageLoader.js';


const LIFEPOINT_SIZE = 16;
const NUMBER_LIFEPOINTS = 3;
const WIDTH = 320;
const HEIGHT = 240;


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Character;
    private scene: Scene;
    private imgBackground = undefined;
    private lastLoop: Date = new Date();
    private characters: PhysicalObject[] = [];
    private hearts = [];
    private clippingFactor = 0;
    private win: boolean = false;
    private lost: boolean = false;
    private lifepoints = NUMBER_LIFEPOINTS;
    private hurt = 0;

    constructor(canvas: HTMLCanvasElement, imgForeGround: HTMLImageElement, imgBackground: HTMLImageElement) {
        Music.play("music");
        this.canvas = canvas;
        this.scene = new Scene(imgForeGround);
        let xdede = 200;
        while(xdede < this.scene.width) {
            let y = this.scene.getYGround(xdede);
            if (y) {
                this.dede = new Character("cat", 48, { x: xdede+64, y: y - 16});
                break;
            }
                
            xdede++;

        }
        
        let x = WIDTH / 2;
        while (x < this.scene.width) {
            x += 100 + 300 * Math.random();
            let y = this.scene.getYGround(x);
            if (y)
                this.characters.push(new NPC("white_collar", 48, { x: x, y: y }));
        }

        this.imgBackground = imgBackground;//ImageLoader.get(name + "_background");
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


        if (this.hurt == 0)
            for (let character of this.characters) {
                if (!this.tooFar(character))
                    if (character.name == "white_collar")
                        if (PhysicalObject.intersect(this.dede, character)) {
                            this.lifepoints--;
                            Sound.play("hurt");
                            this.hurt = 1;
                            break;
                        }
            }


        for (let heart of this.hearts) {
            if (heart.dead)
                this.removeHeart(heart);
        }



        for (let heart of this.hearts) {
            for (let character of this.characters)
                if (!this.tooFar(character))
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


        if (((this.dede.position.y > this.scene.height) || this.lifepoints <= 0) && !this.lost) {
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


    tooFar(o: PhysicalObject): boolean {
        if (Math.abs(o.position.x - this.dede.position.x) > WIDTH)
            return true;
        if (Math.abs(o.position.y - this.dede.position.y) > HEIGHT)
            return true;
        return false;
    }


    draw() {
        const SCALE = 1;
        if (!ImageLoader.isAllLoaded()) return;

        if (!this.win && !this.lost) {
            this.liveCharacter(this.dede);
            for (let character of this.characters)
                if (!this.tooFar(character))
                    this.liveCharacter(character);

            for (let heart of this.hearts)
                heart.live();
            this.logic();
        }


        let camera = { x: this.dede.position.x - WIDTH / 2, y: this.dede.position.y - HEIGHT / 2 };
        if (camera.x < 0) camera.x = 0;
        if (camera.y < 0) camera.y = 0;

        camera.x = Math.min(camera.x, this.scene.width - WIDTH);
        camera.y = Math.min(camera.y, this.scene.height - HEIGHT);

        let context = this.canvas.getContext("2d");
        context.imageSmoothingEnabled = true;
        context.clearRect(0, 0, WIDTH, HEIGHT);

        context.resetTransform();
        context.translate(-camera.x * SCALE, -camera.y * SCALE);
        context.scale(SCALE, SCALE);

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

        if (this.imgBackground != undefined)
            context.drawImage(this.imgBackground, camera.x / 2, camera.y / 2);


        this.scene.draw(context);

        for (let character of this.characters)
            if (!this.tooFar(character))
                character.draw(context);

        for (let heart of this.hearts)
            heart.draw(context);

        this.dede.draw(context);

        context.restore();
        context.resetTransform();
        context.strokeStyle = "#000000";
        context.font = "20px Georgia";


        for (let i = 0; i < this.lifepoints; i++)
            context.drawImage(ImageLoader.get("lifepoint"), LIFEPOINT_SIZE * i, 0, LIFEPOINT_SIZE, LIFEPOINT_SIZE);
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