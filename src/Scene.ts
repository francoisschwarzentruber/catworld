import { Vector2D, Vector2DUtility } from './Vector2D.js';


export class Scene {
    private img: HTMLImageElement;
    private context: CanvasRenderingContext2D;
    private dataPixel: Uint8ClampedArray;

    constructor(name) {
        this.img = new Image();
        // this.img.src = "./scenetest.png";
        this.img.src = "./" + name + "_scene.png";
        this.img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = this.img.width;
            canvas.height = this.img.height;
            this.context = canvas.getContext('2d');
            this.context.fillStyle = "#FFFFFF";
            this.context.fillRect(0, 0, this.img.width, this.img.height);
            this.context.imageSmoothingEnabled = false;
            this.context.drawImage(this.img, 0, 0);
            this.dataPixel = this.context.getImageData(0, 0, this.img.width, this.img.height).data;

            for (let i = 0; i < this.dataPixel.length; i++)
                if (this.dataPixel[i] < 64) {
                    console.log(i);
                    return;
                }
        }

    }

    get width() {
        return this.img.width;
    }

    get height() {
        return this.img.height;
    }

    getPixel(x, y) {
        let i = (Math.round(y) * this.img.width + Math.round(x)) * 4;
        return this.dataPixel[i];
    }

    draw(context) {
        context.drawImage(this.img, 0, 0);
    }

    /**
     * 
     * @param obj 
     * @returns a vector where to move the guy
     */
    getGoodPositionScore(obj) {
        // this.dataPixel = this.context.getImageData(0, 0, this.img.width, this.img.height).data;




        let isObstacle = (x, y) => {
            return this.getPixel(x + obj.position.x, y + obj.position.y) < 32;
        }


        let getFloorLevel = (ix) => {
            for (let iy = -obj.size / 2; iy < obj.size / 2; iy++) {
                const localXY = Vector2DUtility.rotate({ x: ix, y: iy }, obj.angle);
                const localXYD = Vector2DUtility.rotate({ x: ix, y: iy - 1 }, obj.angle);
                if (isObstacle(localXY.x, localXY.y) && !isObstacle(localXYD.x, localXYD.y)) {
                    return iy;

                }
            }
            return undefined;
        }

        const SIZE = obj.size;
        const FACTOR = SIZE * SIZE;

        let v = { x: 0, y: 0, onFloor: false, angle: 0.0 };
        for (let ix = -SIZE / 2; ix < SIZE / 2; ix++)
            for (let iy = -SIZE / 2; iy < SIZE / 2; iy++) {
                const localXY = Vector2DUtility.rotate({ x: ix, y: iy }, obj.angle);
                //let localXY = { x: ix, y: iy };
                if (isObstacle(localXY.x, localXY.y)) {
                    let xw = 1;//-Math.abs(x)/(SIZE/2);
                    let yw = 1;//-Math.abs(y)/(SIZE/2);
                    v.x += -ix * xw;

                    if (iy < SIZE / 2 - 2) v.y += -iy * yw;
                }
            }

        v.x /= FACTOR;
        v.y /= FACTOR;

        let y1 = getFloorLevel(-obj.size / 2);
        let y2 = getFloorLevel(obj.size / 2);

        if ((y1 != undefined) && (y2 != undefined)) {
            v.angle = obj.angle + Math.atan2(y2 - y1, obj.size);
        }
        else if (y1 != undefined)
            v.angle = obj.angle + 0.05;
        else if (y2 != undefined)
            v.angle = obj.angle - 0.05;
        else {
            v.angle = 0;
        }


        let v2 = Vector2DUtility.rotate(v, -obj.angle);
        v.x = v2.x;
        v.y = v2.y;

        v.onFloor = (v.y < 0);// && (y1 != undefined) && (y2 != undefined);

        //if(Math.abs(v.x) < 0.1) v.x = 0;
        //if(Math.abs(v.y) < 0.1) v.y = 0;

        return v;
    }



}