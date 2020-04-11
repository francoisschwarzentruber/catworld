export class ImageLoader {
    static get(name: string, onload = () => {}) {
        let img = new Image();
        img.onload = onload;
        img.src = "images/" + name + ".png";
        return img;
    }
}