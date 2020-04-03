import { Vector2D, Vector2DUtility } from './Vector2D.js';

/*
const SPEEDDECREASING = 0.5;
const MOVEMENT = 50;
const GRAVITY = 200;
const DT = 0.2;
const JUMP = 400;
const GRAVITYSPEED = 20;*/


const SPEEDDECREASING = 0.5;
const MOVEMENT = 10;
const GRAVITY = 20;
const DT = 0.5;
const JUMP = 40;
const GRAVITYSPEED = 2;

export class Character {
    public size = 48;
    public position: Vector2D;
    public speed: Vector2D;
    public accel: Vector2D;
    private img;
    private imgJump;
    private imgLeft = new Image();
    private imgRight = new Image();
    private imgJumpLeft = this.imgLeft;
    private imgJumpRight = this.imgRight;
    public onFloor: boolean = false;
    public angle = 0;


    constructor(public readonly name: string, position: Vector2D) {
        this.position = position;
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.imgLeft.src = "./" + name + "_left.png";
        this.imgRight.src = "./" + name + "_right.png";
    }


    isFalling() { return this.speed.y > 5 && !this.onFloor; }

    left() {
        this.img = this.imgLeft;
        this.imgJump = this.imgJumpLeft;
        this.accel.x -= MOVEMENT;
        //  this.position.x -= 5;
    }
    right() {
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.accel.x += MOVEMENT;
        //this.position.x += 5;
    }


    jump() {
        if (this.onFloor) {
           this.forceJump();
        }
    }


    forceJump() {
        this.accel.y = -JUMP; this.speed.y = -JUMP / 10;
        this.onFloor = false;
    }


    live() {
        // if (Math.abs(this.speed.x * DT) < 2 && Math.abs(this.speed.y * DT) < 2)
        {
            this.position.x += this.speed.x * DT;
            this.position.y += this.speed.y * DT;
            this.speed.x += this.accel.x * DT;
            this.speed.y += this.accel.y * DT;
        }

        this.speed.x *= SPEEDDECREASING;
        this.accel.x *= SPEEDDECREASING;

        if (this.onFloor) {
            const FACTORONFLOOR = 0.2;
            this.speed.y *= FACTORONFLOOR * SPEEDDECREASING;
            this.accel.y += FACTORONFLOOR * GRAVITYSPEED;
            this.accel.y = Math.min(FACTORONFLOOR * GRAVITY, this.accel.y);
        }
        else {
            this.speed.y *= SPEEDDECREASING;
            this.accel.y += GRAVITYSPEED;
            this.accel.y = Math.min(GRAVITY, this.accel.y);
        }


    }

    draw(context: CanvasRenderingContext2D) {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage((this.speed.y > 0) ? this.img : this.imgJump, - this.size / 2, - this.size / 2, this.size, this.size);
        context.rotate(-this.angle);
        context.translate(-this.position.x, -this.position.y);
    }
}