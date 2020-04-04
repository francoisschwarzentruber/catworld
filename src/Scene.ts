import { Vector2D } from './Vector2D.js';


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

            for(let i = 0; i < this.dataPixel.length; i++)
                if(this.dataPixel[i] < 64)
                    {
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


        let getFloorLevel = (x) => {
            for (let y = -obj.size / 2; y < obj.size / 2; y++)
                if (isObstacle(x, y) && !isObstacle(x, y - 1)) {
                    return y;
                }
            return obj.size / 2;
        }
        
        const SIZE = obj.size;
        const FACTOR = SIZE * SIZE;
        
        let v = { x: 0, y: 0, onFloor: false, angle: 0.0 };
        for (let x = -SIZE / 2; x < SIZE / 2; x++)
            for (let y = -SIZE / 2; y < SIZE / 2; y++)
                if (isObstacle(x, y)) {
                    v.x += -x;
                    v.y += -y;
                }

        v.x /= FACTOR;
        v.y /= FACTOR;

        let y1 = getFloorLevel(-obj.size / 2);
        let y2 = getFloorLevel(obj.size / 2);

        v.angle = Math.atan2(y2 - y1, obj.size);
        v.onFloor = (v.y < 0);
        //if(Math.abs(v.x) < 0.1) v.x = 0;
        //if(Math.abs(v.y) < 0.1) v.y = 0;

        return v;
    }



}