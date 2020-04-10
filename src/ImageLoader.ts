export class ImageLoader {
    static get(name: string) {
        let img = new Image();
        img.src = name + ".png";
        return img;
    }
}