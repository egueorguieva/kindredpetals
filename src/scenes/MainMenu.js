import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
      super('MainMenu');
    }

    preload() {
      this.load.image("background", "assets/start-bg-4.png")
      this.load.image("level2", "assets/level1-2.png")
      this.load.image("level1", "assets/level2-2.png")
      this.load.image("level3", "assets/level3.png")
      this.load.image("lock", "assets/lock.png")
    }

    create ()
    {
        this.randomizedLevels = this.game.randomizedLevels;
        console.log("Randomized level list:", this.randomizedLevels);

        const hoverSound = this.sound.add("hover")
        const selectSound = this.sound.add("select")

        const bg = this.add.image(0, 0, "background")
        bg.setOrigin(0, 0)
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height) // Scale to fit
        bg.setTint(0xFFFFFF)

        const title = this.add.text(745, 117, 'Kindred \nPetals', 
          {
            fontFamily: 'PixelFont', fontSize: '50px', color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
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
              (2 * this.cameras.main.height) / 3 - 25,
              levelLabels[i],
              {
                fontFamily: "cursive",
                fontSize: 45,
                color: "#FFF4F2",
                stroke: '#000000', 
                strokeThickness: 4,
              }
            )
            label.setOrigin(0.5, 0.5)
            label.setShadow(1, 1, "#FFB6C1", 3, false, true)

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
            selectSound.play()
            this.scene.start(this.randomizedLevels[0].key);
        })

        const muteIcon = this.add.image(90, 65, "muteIcon")
        muteIcon.setInteractive()
        muteIcon.setScale(0.2)
        muteIcon.setVisible(false)
        muteIcon.preFX.addShadow()

        muteIcon.on("pointerdown", () => {
            this.sound.mute = false
            selectSound.play()
            muteIcon.setVisible(false)
            soundIcon.setVisible(true)
        })

        const soundIcon = this.add.image(90, 65, "soundIcon")
        soundIcon.setInteractive()
        soundIcon.setScale(0.2)
        soundIcon.preFX.addShadow()

        soundIcon.on("pointerover", () => {
          soundIcon.setScale(0.25)
          hoverSound.play()
        })
  
        soundIcon.on("pointerout", () => {
          soundIcon.setScale(0.2)
        })

        soundIcon.on("pointerdown", () => {
            selectSound.play()
            this.sound.mute = true
            muteIcon.setVisible(true)
            soundIcon.setVisible(false)
        })
   
    }
}
