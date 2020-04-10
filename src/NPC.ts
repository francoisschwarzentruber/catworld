import { Character } from "./Character.js";

export class NPC extends Character {



    i = 0;
    d = 0;


    live() {
        super.live();

        if (this.i == 0) {
            if (Math.random() < 0.5)
                this.d = 0;
            if (Math.random() < 0.5)
                this.d = 1;
            if (Math.random() < 0.5)
                this.d = -1;
        }
        this.i++;

        if (this.i > 100 && Math.random() < 0.5) {
            this.i = 0;
        }



        if (this.d < 0 && this.i % 2 == 0) this.left();

        if (this.d > 0 && this.i % 2 == 0) this.right();

    }

}