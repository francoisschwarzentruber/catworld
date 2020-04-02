import { Cat } from './Cat.js';
import { Scene } from './Scene.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Cat;
    private scene: Scene;
    private imgBackground = new Image();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Cat();

        this.imgBackground.src = "./fond_coeur.png";
    }

    draw() {
        for (let t = 0; t < 5; t++) {
            let previousPosition = { x: this.dede.position.x, y: this.dede.position.y };

            let score = this.scene.getGoodPositionScore(this.dede);


            this.dede.live();

            if (this.scene.getGoodPositionScore(this.dede) < score) {
                score = this.scene.getGoodPositionScore(this.dede);
                this.dede.position.y-=10;
                if (this.scene.getGoodPositionScore(this.dede) < score)
                    this.dede.position = previousPosition;
                else {
                    this.dede.accel.y = 0;
                    this.dede.speed.y = 0;
                }
                    
            }



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

        // context.resetTransform();
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