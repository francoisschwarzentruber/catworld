import { Cat } from './Cat.js';


export class Game {
    private canvas: HTMLCanvasElement;
    private dede: Cat;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.dede = new Cat();

    }

    draw() {
        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, 640, 480);
        this.dede.draw(context);

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