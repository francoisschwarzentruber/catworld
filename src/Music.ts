export class Music {

    private static audios: HTMLAudioElement[] = [];

    private static currentMusic: string;

    static addAudio(filename) {
        Music.audios[filename] = new Audio("music/" + filename + ".ogg");
        Music.audios[filename].volume = 0.1;
        Music.audios[filename].oncanplay = () => {if(filename == this.currentMusic) Music.audios[filename].play();}
    }


    static stop() {
        if (Music.audios[Music.currentMusic]) {
            Music.audios[Music.currentMusic].pause();
            Music.audios[Music.currentMusic].currentTime = 0;
        }
    }


    static play(filename) {
        this.stop();
        if (!Music.audios[filename])
            this.addAudio(filename);
        if (Music.audios[filename]) Music.audios[filename].play();
        console.log("music = " + filename)
        Music.currentMusic = filename;
    }
}