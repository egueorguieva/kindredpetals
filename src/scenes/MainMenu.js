import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
      super('MainMenu');
    }

    preload() {
      this.load.image("background", "assets/start-bg-3.png")
      this.load.image("level1", "assets/level1-2.png")
      this.load.image("level2", "assets/level2-2.png")
      this.load.image("level3", "assets/level3.png")
      this.load.image("lock", "assets/lock.png")
    }

    create ()
    {
        const hoverSound = this.sound.add("hover")

        const bg = this.add.image(0, 0, "background")
        bg.setOrigin(0, 0)
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height) // Scale to fit
        bg.setTint(0xFFF4F2)

        const title = this.add.text(710, 265, 'Kindred Petals', 
          {
            fontFamily: 'cursive', fontSize: 115, color: '#FFF4F2',
            stroke: '#000000', strokeThickness: 7,
            align: 'center'
          }
        )
        .setOrigin(0.5)
        .setShadow(2, 2, "#FFB6C1", 4, false, true)

        const levelTileWidth = 900
        const levelTileScale = levelTileWidth / this.cameras.main.width

        const levels = []
        const levelLabels = ['Novice', 'Apprentice', 'Expert']

        for (let i = 0; i < 3; i++) {
          const plank = this.add.image(
            ((i + 1) * this.cameras.main.width) / 5 + 140,
            (2 * this.cameras.main.height) / 3 - 30,
            "plank"
          )
          plank.setScale(0.15)
          plank.preFX.addShadow()
            
          const label = this.add.text(
              ((i + 1) * this.cameras.main.width) / 5 + 140,
              (2 * this.cameras.main.height) / 3 - 30,
              levelLabels[i],
              {
                fontFamily: "cursive",
                fontSize: 45,
                color: "#ffffff",
                stroke: '#000000', 
                strokeThickness: 3,
              }
            )
            label.setOrigin(0.5, 0.5)
            label.setShadow(1, 1, "#000000", 3, false, true)

          const level = this.add.image(
            ((i + 1) * this.cameras.main.width) / 5 + 140,
                (2 * this.cameras.main.height) / 3 + 190,
                `level${i + 1}`
            )
            .setInteractive()
          level.setScale(levelTileScale)
          level.preFX.addShadow()
          levels.push(level)
        }

        for (let i = 0; i < 3; i++) {
            const group = this.add.group()
            const level = levels[i]
            group.add(level)
            if (i !== 0) {
              const lock = this.add.image(
                ((i + 1) * this.cameras.main.width) / 5 + 140,
                (2 * this.cameras.main.height) / 3 + 190,
                "lock"
              )
              lock.setScale(0.12)
              levels[i].setTint(0x808080)
              group.add(lock)
            }
            level.on("pointerover", () => {
              level.setScale(levelTileScale + 0.02)
              hoverSound.play()
            })
      
            level.on("pointerout", () => {
              level.setScale(levelTileScale)
            })
        }


        levels[0].on("pointerdown", () => {
            this.scene.start("Level1")
        })

        const muteIcon = this.add.image(210, 80, "muteIcon")
        muteIcon.setInteractive()
        muteIcon.setScale(0.3)
        muteIcon.setVisible(false)
        muteIcon.preFX.addShadow()

        muteIcon.on("pointerdown", () => {
            this.sound.mute = false
            muteIcon.setVisible(false)
            soundIcon.setVisible(true)
        })

        const soundIcon = this.add.image(210, 80, "soundIcon")
        soundIcon.setInteractive()
        soundIcon.setScale(0.3)
        soundIcon.preFX.addShadow()

        soundIcon.on("pointerover", () => {
          soundIcon.setScale(0.35)
          hoverSound.play()
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
