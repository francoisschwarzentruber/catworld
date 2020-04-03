import { Vector2D } from './Vector2D.js';

const SPEEDDECREASING = 0.5;
const MOVEMENT = 30;
const GRAVITY = 60;
const DT = 0.2;
const JUMP = 200;
const GRAVITYSPEED = 10;

export class Cat {
    public size = 48;
    public position: Vector2D;
    public speed: Vector2D;
    public accel: Vector2D;
    private img;
    private imgJump;
    private imgLeft = new Image();
    private imgRight = new Image();
    private imgJumpLeft = new Image();
    private imgJumpRight = new Image();

    constructor() {
        this.position = { x: 350, y: 100 };
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.imgLeft.src = "./cat_left.png";
        this.imgRight.src = "./cat_right.png";
        this.imgJumpLeft.src = "./cat_jump_left.png";
        this.imgJumpRight.src = "./cat_jump_right.png";
    }

    left() { this.img = this.imgLeft; this.imgJump = this.imgJumpLeft; this.accel.x -= MOVEMENT; this.position.x--; }
    right() { this.img = this.imgRight; this.imgJump = this.imgJumpRight; this.accel.x += MOVEMENT; this.position.x++; }
    jump() { this.accel.y = -JUMP; this.speed.y = -JUMP/10; }


    live() {
       // if (Math.abs(this.speed.x * DT) < 2 && Math.abs(this.speed.y * DT) < 2)
         {
            this.position.x += this.speed.x * DT;
            this.position.y += this.speed.y * DT;
            this.speed.x += this.accel.x * DT;
            this.speed.y += this.accel.y * DT;
        }

        this.speed.x *= SPEEDDECREASING;
        this.speed.y *= SPEEDDECREASING;
        this.accel.x *= SPEEDDECREASING;
        this.accel.y += GRAVITYSPEED;
        this.accel.y = Math.min(GRAVITY, this.accel.y);

    }

    draw(context: CanvasRenderingContext2D) {
        if (this.speed.y > 0)
            context.drawImage(this.img, this.position.x, this.position.y , this.size, this.size);
        else
            context.drawImage(this.imgJump, this.position.x, this.position.y , this.size, this.size);
    }
}