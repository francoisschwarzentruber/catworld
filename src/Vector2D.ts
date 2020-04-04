export type Vector2D = { x: number, y: number };

export class Vector2DUtility {
    static getAngle(v: Vector2D) {
        return Math.atan2(v.x, -v.y);
    }

    static rotate(v: Vector2D, angle: number) {
        return {
            x: v.x * Math.cos(angle) - v.y * Math.sin(angle),
            y: v.x * Math.sin(angle) + v.y * Math.cos(angle)
        };
    }

    static copy(v: Vector2D) { return { x: v.x, y: v.y }; }

    static dist(a: Vector2D, b: Vector2D) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
}