import { ImageLoader } from './ImageLoader.js';
import { Vector2D, Vector2DUtility } from './Vector2D.js';


export class Scene {
    private img: HTMLImageElement;
    private context: CanvasRenderingContext2D;
    private dataPixel: Uint8ClampedArray;

    constructor(imgForeGround) {
        this.img = imgForeGround;

        console.log("loading scene...")
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

    get width() {
        return this.img.width;
    }

    get height() {
        return this.img.height;
    }

    getPixel(x, y) {
        let i = (Math.round(y) * this.img.width + Math.round(x)) * 4;
        // if(this.dataPixel)
        return this.dataPixel[i];
        //return 255;
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


        if (obj.position.x - obj.size / 2 < 0)
            obj.position.x = obj.size / 2;


        let isObstacle = (x, y) => {
            return this.getPixel(x + obj.position.x, y + obj.position.y) < 64;
        }


        let getFloorLevel = (ix) => {
            let SIZE = obj.size * 1.5;
            for (let iy = 0; iy < SIZE; iy++) {
                const localXY = { x: ix, y: iy };// Vector2DUtility.rotate({ x: ix, y: iy }, obj.angle);
                const localXYD = { x: ix, y: iy - 1 };//Vector2DUtility.rotate({ x: ix, y: iy - 1 }, obj.angle);

                if (isObstacle(localXY.x, localXY.y) && !isObstacle(localXYD.x, localXYD.y)) {
                    return iy;

                }
            }
            return undefined;
        }

        const SIZEX = obj.size * 0.75;
        const SIZEY = obj.size;

        const FACTORY = 1 / 160;//(SIZEY*SIZEY);
        const FACTORX = 1 / 80;//SIZEY*SIZEY;

        let v = { x: 0, y: 0, onFloor: false, angle: 0.0 };
        for (let ix = -SIZEX / 2; ix < SIZEX / 2; ix++)
            for (let iy = -SIZEY * 0.2; iy < SIZEY / 2; iy++) {
                //const localXY = Vector2DUtility.rotate({ x: ix, y: iy }, obj.angle);
                let localXY = { x: ix, y: iy };
                if (isObstacle(localXY.x, localXY.y)) {
                    let xw = 1;//-Math.abs(x)/(SIZE/2);
                    let yw = 1;//-Math.abs(y)/(SIZE/2);
                    if (iy < 0) v.x += -ix * xw;



                    if (obj.speed.y < 0) {
                        yw = 3 * (SIZEY / 2 - Math.abs(iy)) / (SIZEY / 2);
                        v.y += -iy * yw;//
                    }
                    else {
                        yw = 0.5 * (SIZEY / 2 - Math.abs(iy)) / (SIZEY / 2);
                        if (iy < SIZEY / 2 - 2 && obj.speed.y > 0) v.y += -iy * yw;// * (SIZEY/2-Math.abs(iy))/(SIZEY/2);
                    }


                    //if (iy < SIZEY / 2 - 2) v.y += -iy * yw;
                }
            }


        let y1 = getFloorLevel(-obj.size / 4);
        let y2 = getFloorLevel(obj.size / 4);

        const MAXANGLE = 1;
        if ((y1 != undefined) && (y2 != undefined)) {
            v.angle = Math.atan2(y2 - y1, obj.size);

            if (y1 < SIZEY / 2 && y2 < SIZEY / 2 && obj.speed.y > 0)
                obj.position.y -= (SIZEY / 2 - Math.max(y1, y2) * Math.cos(v.angle) - 2);

            v.angle = Math.min(v.angle, MAXANGLE);
            v.angle = Math.max(v.angle, -MAXANGLE);
        }/*
        else if (y1 != undefined)
            v.angle = obj.angle + 0.05;
        else if (y2 != undefined)
            v.angle = obj.angle - 0.05;*/
        else {
            v.angle = 0;
        }


        let v2 = v;//Vector2DUtility.rotate(v, -obj.angle);
        v.x = v2.x *= FACTORX;
        v.y = v2.y *= FACTORY;

        v.onFloor = (v.y < 0);// && (y1 != undefined) && (y2 != undefined);

        //if(Math.abs(v.x) < 0.1) v.x = 0;
        //if(Math.abs(v.y) < 0.1) v.y = 0;

        return v;
    }



}