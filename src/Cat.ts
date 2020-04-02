type Vector2D = { x: number, y: number };


const SPEEDDECREASING = 0.8;
const MOVEMENT = 10;
const GRAVITY = 10;
const SIZE = 64;
const DT = 0.2;
const JUMP = 50;

export class Cat {

    public position: Vector2D;
    public speed: Vector2D;
    public accel: Vector2D;
    private img = new Image();
    private imgJump = new Image();

    constructor() {
        this.position = { x: 100, y: 1000 };
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
        this.img.src = "./cat.png";
        this.imgJump.src = "./catjump.png";
    }

    left() { this.accel.x -= MOVEMENT; this.position.x--; }
    right() { this.accel.x += MOVEMENT; this.position.x++; }
    jump() { this.accel.y = -JUMP; }


    live() {
        this.position.x += this.speed.x * DT;
        this.position.y += this.speed.y * DT;
        this.speed.x += this.accel.x * DT;
        this.speed.y += this.accel.y * DT;
        this.speed.x *= SPEEDDECREASING;
        this.speed.y *= SPEEDDECREASING;
        this.accel.x *= SPEEDDECREASING;
        this.accel.y += SPEEDDECREASING;
        this.accel.y = Math.min(GRAVITY, this.accel.y);

    }

    draw(context: CanvasRenderingContext2D) {
        if (this.accel.y < 0)
            context.drawImage(this.img, this.position.x, this.position.y - SIZE, SIZE, SIZE);
        else
            context.drawImage(this.imgJump, this.position.x, this.position.y - SIZE, SIZE, SIZE);
    }
}