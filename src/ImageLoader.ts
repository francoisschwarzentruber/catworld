export class ImageLoader {
    static get(name: string) {
        let img = new Image();
        img.src = "images/" + name + ".png";
        return img;
    }
}