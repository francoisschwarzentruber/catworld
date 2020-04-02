import { Cat } from './Cat.js';
import { Scene } from './Scene.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Cat;
    private scene: Scene;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Scene();
        this.dede = new Cat();
    }

    draw() {

        let previousPosition = { x: this.dede.position.x, y: this.dede.position.y };

        for (let t = 0; t < 5; t++) {
            this.dede.live();

            let i = 0;
            while(!this.scene.isGoodPosition(this.dede) ||( i <= 3)) {
                this.dede.position.x -= this.dede.speed.x;
                this.dede.position.y -= this.dede.speed.y;
                i++;
            }
            if (i > 3) {
                this.dede.position = previousPosition;
                this.dede.accel = {x: -this.dede.accel.x, y: -this.dede.accel.y};
            }
            else {

            }
        }


        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, 640, 480);

        //context.save();
        context.resetTransform();
        
        context.translate(-this.dede.position.x + 640 / 2, -this.dede.position.y + 480 / 2);
        
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