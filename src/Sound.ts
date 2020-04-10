export class Sound {

    static audios = [];

    static  addAudio(filename) {
        Sound.audios[filename] = new Audio(filename + ".ogg");
    }

    static play(filename) {
        if (!Sound.audios[filename])
            this.addAudio(filename);
        if (Sound.audios[filename]) Sound.audios[filename].play();
    }
    


}
