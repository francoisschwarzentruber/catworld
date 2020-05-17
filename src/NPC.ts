import { Character } from "./Character.js";

export class NPC extends Character {
    iTime = 0;
    iDirection = 0;


    live() {
        super.live();

        if (this.iTime == 0) {
            if (Math.random() < 0.5)
                this.iDirection = 0;
            if (Math.random() < 0.5)
                this.iDirection = 1;
            if (Math.random() < 0.5)
                this.iDirection = -1;
        }
        this.iTime++;

        if (this.iTime > 100 && Math.random() < 0.5) {
            this.iTime = 0;
        }

        if (this.iDirection < 0 && this.iTime % 2 == 0) this.left();
        if (this.iDirection > 0 && this.iTime % 2 == 0) this.right();

    }

}