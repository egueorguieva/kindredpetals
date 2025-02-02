import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        this.load.audio("hover", "assets/sound-effects/hover.wav");
        this.load.audio("bgm", "assets/sound-effects/bgm.mp3");

        this.load.image("soundIcon", "assets/music-note.png")
        this.load.image("muteIcon", "assets/mute-note.png")
        this.load.image("plank", "assets/plank.png")
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        const bgm = this.sound.add("bgm")
        bgm.play({ loop: true, volume: 0.1 })
        this.scene.start('MainMenu');
    }
}
