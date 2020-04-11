export class ImageLoader {
    static imgs = {};
    static allLoaded = false;
    static get(name: string, onload = () => { }) {
        if (this.imgs[name])
            return this.imgs[name];

        this.allLoaded = false;
        this.imgs[name] = new Image();
        this.imgs[name].onload = onload;
        this.imgs[name].src = "images/" + name + ".png";
        return this.imgs[name];
    }

    static isAllLoaded() {
        if (this.allLoaded) return true;

        for(let name in this.imgs) {
            if(this.imgs[name].height == 0)
                return false;
        }

        this.allLoaded = true;
        return true;
    }

}