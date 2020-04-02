type Vector2D = {x: number, y: number};


const SPEEDDECREASING = 0.7;

export class Cat {

    private position:Vector2D;
    private speed:Vector2D;
    private accel:Vector2D;

    constructor() {
        this.position = {x: 100, y: 200};
        this.speed = {x: 0, y: 0};
        this.accel = {x: 0, y: 0};
    }

    left() { this.accel.x--; }
    right() { this.accel.x++; }
    jump() { this.accel.y=-100; }

    draw(context: CanvasRenderingContext2D) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed.x += this.accel.x;
        this.speed.y += this.accel.y;
        this.speed.x *= SPEEDDECREASING;
        this.speed.y *= SPEEDDECREASING;
        this.accel.x *= SPEEDDECREASING;
        this.accel.y += SPEEDDECREASING;
        this.accel.y = Math.max(5, this.accel.y);
       
        this.position.y = Math.min(this.position.y, 300);

        context.fillRect(this.position.x, this.position.y, 32, 32);
    }
}