import { Vector2DUtility } from './Vector2D.js';
import { Character } from './Character.js';
import { Scene } from './Scene.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Character;
    private scene: Scene;
    private imgBackground = new Image();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Character("cat");

        this.imgBackground.src = "./fond_coeur.png";
    }

    draw() {
        this.dede.live();

        for (let i = 0; i < 1; i++) {
            const infoPosition = this.scene.getGoodPositionScore(this.dede);


            this.dede.onFloor = infoPosition.onFloor;
            
            if(this.dede.onFloor)
                this.dede.angle = infoPosition.angle;

            this.dede.position.x += infoPosition.x;
            this.dede.position.y += infoPosition.y;
            this.dede.speed.x += infoPosition.x;
            this.dede.speed.y += infoPosition.y;
            this.dede.accel.x += infoPosition.x;
            this.dede.accel.y += infoPosition.y;
        }
        /*
for (let t = 0; t < 3; t++) {
    

    let i = 0;
    while (!this.scene.getGoodPositionScore(this.dede) && (i <= 10)) {
        this.dede.position.x = -this.dede.speed.x;
        this.dede.position.y = -this.dede.speed.y;
        this.dede.accel.x = 0;
        this.dede.accel.y = 0;
        i++;
    }
   
}*/


        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, 640, 480);


        //context.save();
        context.resetTransform();
        context.translate(-this.dede.position.x + 640 / 2, -this.dede.position.y + 480 / 2);
        context.scale(2, 2);

        context.drawImage(this.imgBackground, 0, 0);


        context.resetTransform();
        context.translate(-this.dede.position.x * 2 + 640 / 2, -this.dede.position.y * 2 + 480 / 2);
        context.scale(2, 2);

        this.scene.draw(context);
        this.dede.draw(context);

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