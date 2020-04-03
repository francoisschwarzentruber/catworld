/*
const SPEEDDECREASING = 0.5;
const MOVEMENT = 50;
const GRAVITY = 200;
const DT = 0.2;
const JUMP = 400;
const GRAVITYSPEED = 20;*/
var SPEEDDECREASING = 0.5;
var MOVEMENT = 10;
var GRAVITY = 20;
var DT = 0.5;
var JUMP = 40;
var GRAVITYSPEED = 2;
var Character = /** @class */ (function () {
    function Character(name, position) {
        this.name = name;
        this.size = 48;
        this.imgLeft = new Image();
        this.imgRight = new Image();
        this.imgJumpLeft = this.imgLeft;
        this.imgJumpRight = this.imgRight;
        this.onFloor = false;
        this.angle = 0;
        this.position = position;
        this.speed = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0 };
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.imgLeft.src = "./" + name + "_left.png";
        this.imgRight.src = "./" + name + "_right.png";
    }
    Character.prototype.isFalling = function () { return this.speed.y > 5 && !this.onFloor; };
    Character.prototype.left = function () {
        this.img = this.imgLeft;
        this.imgJump = this.imgJumpLeft;
        this.accel.x -= MOVEMENT;
        //  this.position.x -= 5;
    };
    Character.prototype.right = function () {
        this.img = this.imgRight;
        this.imgJump = this.imgJumpRight;
        this.accel.x += MOVEMENT;
        //this.position.x += 5;
    };
    Character.prototype.jump = function () {
        if (this.onFloor) {
            this.forceJump();
        }
    };
    Character.prototype.forceJump = function () {
        this.accel.y = -JUMP;
        this.speed.y = -JUMP / 10;
        this.onFloor = false;
    };
    Character.prototype.live = function () {
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
            var FACTORONFLOOR = 0.2;
            this.speed.y *= FACTORONFLOOR * SPEEDDECREASING;
            this.accel.y += FACTORONFLOOR * GRAVITYSPEED;
            this.accel.y = Math.min(FACTORONFLOOR * GRAVITY, this.accel.y);
        }
        else {
            this.speed.y *= SPEEDDECREASING;
            this.accel.y += GRAVITYSPEED;
            this.accel.y = Math.min(GRAVITY, this.accel.y);
        }
    };
    Character.prototype.draw = function (context) {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage((this.speed.y > 0) ? this.img : this.imgJump, -this.size / 2, -this.size / 2, this.size, this.size);
        context.rotate(-this.angle);
        context.translate(-this.position.x, -this.position.y);
    };
    return Character;
}());
export { Character };
//# sourceMappingURL=Character.js.map