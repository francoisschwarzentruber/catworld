export type Vector2D = { x: number, y: number };

export class Vector2DUtility {
    static getAngle(v: Vector2D) {
        return Math.atan2(v.x, -v.y);
    }
}