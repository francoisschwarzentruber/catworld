export class Sound {

    static audios = [];

    static  addAudio(filename) {
        Sound.audios[filename] = new Audio("sounds/" + filename + ".ogg");
    }

    static play(filename) {
        console.log("play " + filename);
        if (!Sound.audios[filename])
            this.addAudio(filename);
        if (Sound.audios[filename]) Sound.audios[filename].play();
    }
    


}

