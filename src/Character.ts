import { PhysicalObject } from './PhysicalObject.js';
import { Vector2D } from './Vector2D.js';
import { Sound } from './Sound.js';

export class Character extends PhysicalObject {
    public direction: Vector2D = { x: 1, y: 0 };

    MOVEMENT = 10;
    JUMP = 40;
    countJump = 0;


    left() {
        this.img = this.imgLeft;
        this.imgJump = this.imgJumpLeft;
        this.accel.x -= this.MOVEMENT;
        this.direction = { x: -1, y: 0 };
        //  this.position.x -= 5;
    }
    right() {
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.accel.x += this.MOVEMENT;
        this.direction = { x: 1, y: 0 };
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
                this.angle += 0.8;
            else
                this.angle = 0;
        }


    }

}