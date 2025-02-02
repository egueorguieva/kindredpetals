import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload() {
        this.load.image("background", "assets/start-bg-3.png")
        this.load.image("level1", "assets/level1.png")
        this.load.image("level2", "assets/level2.png")
        this.load.image("level3", "assets/level3.png")
        this.load.image("lock", "assets/lock.png")
    }

    create ()
    {
        const bg = this.add.image(0, 0, "background")
        bg.setOrigin(0, 0)
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height) // Scale to fit

        this.add.text(735, 180, 'Kindred Petals', {
            fontFamily: 'cursive', fontSize: 120, color: '#000000',
            stroke: '#ffffff', strokeThickness: 5,
            align: 'center'
        })
        .setOrigin(0.5);

        const levelTileWidth = 700
        const levelTileScale = levelTileWidth / this.cameras.main.width

        const levels = []
        const levelLabels = ['Beginner', 'Level 2', 'Level 3']

        for (let i = 0; i < 3; i++) {
            const level = this.add.image(
                 ((i + 1) * this.cameras.main.width) / 5,
                    (2 * this.cameras.main.height) / 3,
                    `level${i + 1}`
                )
                .setInteractive()
            level.setScale(levelTileScale)
            level.preFX.addShadow()
            levels.push(level)
            
            const label = this.add.text(
                ((i + 1) * this.cameras.main.width) / 5,
                (2 * this.cameras.main.height) / 3 + 200,
                levelLabels[i],
                {
                  fontFamily: "cursive",
                  fontSize: 50,
                  color: "#ffffff",
                  stroke: '#000000', 
                  strokeThickness: 3,
                }
              )
              label.setOrigin(0.5, 0.5)
              label.setShadow(1, 1, "#000000", 3, false, true)
        }

        for (let i = 0; i < 3; i++) {
            const group = this.add.group()
            const level = levels[i]
            group.add(level)
            if (i !== 0) {
              const lock = this.add.image(
                ((i + 1) * this.cameras.main.width) / 5,
                (2 * this.cameras.main.height) / 3,
                "lock"
              )
              lock.setScale(0.15)
              levels[i].setTint(0x808080)
              group.add(lock)
            }
            level.on("pointerover", () => {
              level.setScale(levelTileScale + 0.02)
            })
      
            level.on("pointerout", () => {
              level.setScale(levelTileScale)
            })
        }


        levels[0].on("pointerdown", () => {
            this.scene.start("Level1")
        })

        const muteIcon = this.add.image(210, 75, "muteIcon")
        muteIcon.setInteractive()
        muteIcon.setScale(0.3)
        muteIcon.setVisible(false)

        muteIcon.on("pointerdown", () => {
            this.sound.mute = false
            muteIcon.setVisible(false)
            soundIcon.setVisible(true)
        })

        const soundIcon = this.add.image(210, 75, "soundIcon")
        soundIcon.setInteractive()
        soundIcon.setScale(0.3)

        soundIcon.on("pointerover", () => {
          soundIcon.setScale(0.35)
        })
  
        soundIcon.on("pointerout", () => {
          soundIcon.setScale(0.3)
        })

        soundIcon.on("pointerdown", () => {
            this.sound.mute = true
            muteIcon.setVisible(true)
            soundIcon.setVisible(false)
        })
   
    }
}
