import { Vector2D, Vector2DUtility } from './Vector2D.js';
import { ImageLoader } from './ImageLoader.js';

/*
const SPEEDDECREASING = 0.5;
const MOVEMENT = 50;
const GRAVITY = 200;
const DT = 0.2;
const JUMP = 400;
const GRAVITYSPEED = 20;*/


export class PhysicalObject {
    public position: Vector2D;

    public speed: Vector2D;
    public accel: Vector2D;

    SPEEDDECREASING = 0.5;
    GRAVITY = 20;
    readonly DT = 0.5;
    
    GRAVITYSPEED = 2;

    protected img;
    protected imgJump;
    protected imgLeft = new Image();
    protected imgRight = new Image();
    protected imgJumpLeft = this.imgLeft;
    protected imgJumpRight = this.imgRight;
    public onFloor: boolean = false;
    public angle = 0;


    constructor(public readonly name: string, public readonly size: number, position: Vector2D) {
        this.position = Vector2DUtility.copy(position);
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
        this.imgJump = this.imgJumpRight;
        this.imgLeft = ImageLoader.get(name + "_left");
        this.imgRight = ImageLoader.get(name + "_right");
        this.img = this.imgRight;
    }


    isFalling() { return this.speed.y > 5 && !this.onFloor; }



    live() {
        // if (Math.abs(this.speed.x * DT) < 2 && Math.abs(this.speed.y * DT) < 2)
        {
            this.position.x += this.speed.x * this.DT;
            this.position.y += this.speed.y * this.DT;
            this.speed.x += this.accel.x * this.DT;
            this.speed.y += this.accel.y * this.DT;
        }

        this.speed.x *= this.SPEEDDECREASING;
        this.accel.x *= this.SPEEDDECREASING;

        if (this.onFloor) {
            const FACTORONFLOOR = 0.2;
            this.speed.y *= FACTORONFLOOR * this.SPEEDDECREASING;
            this.accel.y += FACTORONFLOOR * this.GRAVITYSPEED;
            this.accel.y = Math.min(FACTORONFLOOR * this.GRAVITY, this.accel.y);
        }
        else {
            this.speed.y *= this.SPEEDDECREASING;
            this.accel.y += this.GRAVITYSPEED;
            this.accel.y = Math.min(this.GRAVITY, this.accel.y);
        }


    }

    draw(context: CanvasRenderingContext2D) {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage(this.img, - this.size / 2, - this.size / 2, this.size, this.size);
        context.rotate(-this.angle);
        context.translate(-this.position.x, -this.position.y);
    }



    static intersect(o1, o2) {
        if(Vector2DUtility.dist(o1.position, o2.position) < 32) {
            return true;
        }
        return false;
    }
}