import { Vector2DUtility } from './Vector2D.js';
import { PhysicalObject } from "./PhysicalObject.js";

export class Heart extends PhysicalObject {
    constructor(position, direction) {
        const HEART_THROW_STRENGTH = 100;
        const HEART_THROW_HEIGHT = 20;


        super("heart", 32, position);

        direction = {
            x: HEART_THROW_STRENGTH * direction.x,
            y: HEART_THROW_STRENGTH * direction.y + HEART_THROW_HEIGHT
        }


        this.speed = Vector2DUtility.copy(direction);
        this.accel = Vector2DUtility.copy(direction);
    }
}