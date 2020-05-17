import { Vector2DUtility } from './Vector2D.js';
import { PhysicalObject } from "./PhysicalObject.js";

export class Heart extends PhysicalObject {

    private i: number;

    constructor(position, direction) {
        const HEART_THROW_STRENGTH = 3;
        const HEART_THROW_HEIGHT = 1;

        super("heart", 16, position);
        this.SPEEDDECREASING = 1;
        this.GRAVITY = 0;
        this.i = 0;

        direction = {
            x: HEART_THROW_STRENGTH * direction.x,
            y: HEART_THROW_STRENGTH * direction.y + HEART_THROW_HEIGHT
        }

        
        this.speed = Vector2DUtility.copy(direction);
        this.accel = Vector2DUtility.copy(direction);
    }




    live() {
        super.live();
        this.i++;
        this.dead = (this.i > 15);
    }


}