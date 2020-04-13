import { PhysicalObject } from './PhysicalObject.js';
import { Vector2D } from './Vector2D.js';
import { Sound } from './Sound.js';
import { ImageLoader } from './ImageLoader.js';

export class Character extends PhysicalObject {
    public direction: Vector2D = { x: 1, y: 0 };

    imgMovementLeft = [];
    imgMovementRight = [];

    constructor(public readonly name: string, public readonly size: number, position: Vector2D) {
        super(name, size, position);

        if (name == "cat") {
            this.imgMovementLeft.push(ImageLoader.get("cat_left_1"));
            this.imgMovementLeft.push(ImageLoader.get("cat_left"));
            this.imgMovementLeft.push(ImageLoader.get("cat_left_2"));

            this.imgMovementRight.push(ImageLoader.get("cat_right_1"));
            this.imgMovementRight.push(ImageLoader.get("cat_right"));
            this.imgMovementRight.push(ImageLoader.get("cat_right_2"));
        }
    }

    MOVEMENT = 10;
    JUMP = 40;
    countJump = 0;

    iMovement = 0;


    left() {

        this.imgJump = this.imgJumpLeft;
        this.accel.x -= this.MOVEMENT;
        this.direction = { x: -1, y: 0 };
        this.iMovement++;
        //  this.position.x -= 5;
    }
    right() {

        this.imgJump = this.imgJumpRight;
        this.accel.x += this.MOVEMENT;
        this.direction = { x: 1, y: 0 };
        this.iMovement++;
        //this.position.x += 5;
    }


    jump() {
        console.log("jump");
        if (this.onFloor) {
            Sound.play("jump");
            this.countJump = 1;
            this.forceJump();
        }
    }


    forceJump() {
        console.log("forceJump");
        this.accel.y = -this.JUMP; this.speed.y = -this.JUMP / 10;
        this.onFloor = false;
    }


    live() {
        super.live();
        if (this.onFloor)
            this.countJump = 0;
        else {
            if (this.countJump > 0) this.countJump++;
            if (this.countJump > 10)
                this.angle += 0.3;
            else
                this.angle = 0;
        }



        let iMovementIndex = Math.round(this.iMovement / 3) % 3;
        if (this.direction.x < 0) {
            this.img = this.imgLeft;
            if (this.speed.x < -1 && this.imgMovementLeft.length > 0)
                this.img = this.imgMovementLeft[iMovementIndex];

            if (this.speed.x > 1 && this.imgMovementLeft.length > 0)
                this.img = this.imgMovementLeft[iMovementIndex];
        }
        else {
            this.img = this.imgRight;
            if (this.speed.x < -1 && this.imgMovementRight.length > 0)
                this.img = this.imgMovementRight[iMovementIndex];

            if (this.speed.x > 1 && this.imgMovementRight.length > 0)
                this.img = this.imgMovementRight[iMovementIndex];
        }

//        (this.speed.y > 0) ? this.img : this.imgJump

    }

}