import { Scene } from 'phaser';

export class Level2 extends Scene
{
  constructor () {
    super('Level2');
  }

  preload () {
    this.load.image('shop-bg', 'assets/main-bg-3.png')
    this.load.image('flower1', 'assets/roses-bunch.png')
    this.load.image('flower2', 'assets/lilies-bunch.png')
    this.load.image('flower3', 'assets/daisies-bunch.png')
    this.load.image('flower4', 'assets/forget-me-nots-bunch.png')
    this.load.image('flower5', 'assets/tulips-bunch.png')
    this.load.image('flower6', 'assets/violets-bunch.png')
    this.load.image('flower7', 'assets/carnations-bunch.png')
    this.load.image('flower8', 'assets/daffodils-bunch.png')
    this.load.image('rose', 'assets/single-rose.png')
    this.load.image('lily', 'assets/single-lily.png')
    this.load.image('daisy', 'assets/single-daisy.png')
    this.load.image('daffodil', 'assets/single-daffodil.png')
    this.load.image('forgetmenot', 'assets/single-forgetmenot.png')
    this.load.image('tulip', 'assets/single-tulip.png')
    this.load.image('violet', 'assets/single-violet.png')
    this.load.image('carnation', 'assets/single-carnation.png')
    this.load.image('vase', 'assets/vase-3.png')
  }
    
  create ()
    {
      const hoverSound = this.sound.add("hover")

      const bg = this.add.image(0, 0, "shop-bg")
      bg.setOrigin(0, 0)
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

      this.vase = this.add.image(1200, 550, 'vase')
      this.vase.setScale(0.5)
      this.vase.setDepth(1);
      this.vase.preFX.addShadow()

      this.setFlowers()
      // this.showStory()
      

      this.handleFlower()

      const muteIcon = this.add.image(1325, 60, "muteIcon")
      muteIcon.setInteractive()
      muteIcon.setScale(0.15)
      muteIcon.setVisible(false)
      muteIcon.preFX.addShadow()

      muteIcon.on("pointerdown", () => {
          this.sound.mute = false
          muteIcon.setVisible(false)
          soundIcon.setVisible(true)
      })

      const soundIcon = this.add.image(1325, 60, "soundIcon")
      soundIcon.setInteractive()
      soundIcon.setScale(0.15)
      soundIcon.preFX.addShadow()

      soundIcon.on("pointerover", () => {
        soundIcon.setScale(0.2)
        hoverSound.play()
      })

      soundIcon.on("pointerout", () => {
        soundIcon.setScale(0.15)
      })

      soundIcon.on("pointerdown", () => {
        this.sound.mute = true
        muteIcon.setVisible(true)
        soundIcon.setVisible(false)
      })

    }

    setFlowers() {
      const createFlower = (x, y, key, scale, origin = { x: 0.5, y: 0.5 }) => {
        const flower = this.add
          .image(x, y, key)
          .setScale(scale)
          .setOrigin(origin.x, origin.y)
          .setInteractive()
          .setDepth(2)
        flower.preFX.addShadow()
        return flower
      }
    
      this.flowers = {
        flower1: { x: 1080, y: 90, key: "flower1", scale: 0.35 }, 
        flower2: { x: 850, y: 100, key: "flower2", scale: 0.35 },
        flower3: { x: 580, y: 95, key: "flower3", scale: 0.35 },
        flower4: { x: 310, y: 100, key: "flower4", scale: 0.35 },
        flower5: { x: 1080, y: 285, key: "flower5", scale: 0.35 },
        flower6: { x: 850, y: 295, key: "flower6", scale: 0.35 },
        flower7: { x: 580, y: 280, key: "flower7", scale: 0.35 },
        flower8: { x: 310, y: 280, key: "flower8", scale: 0.35 },
      }
    
      Object.entries(this.flowers).forEach(([key, flower]) => {
        const createdFlower = createFlower(
          flower.x,
          flower.y,
          flower.key,
          flower.scale,
          flower.origin || undefined
        )
    
        let glow
        createdFlower.on("pointerover", () => {
            this.hoverSound.play()
            glow = createdFlower.preFX.addGlow("000000", 1, 0, false)
            createdFlower.setScale(0.37)
          })
        createdFlower.on("pointerout", () => {
            glow?.setActive(false)
            createdFlower.setScale(0.35)
          })
    
        this.flowers[key] = createdFlower
      })
    }
    

    handleFlower() {

        let flowersPlaced = {
        "rose": 0,
        "daffodil": 0,
        "tulip": 0,
        "lily": 0,
        "daisy": 0,
        "forgetmenot": 0,
        "violet": 0,
        "carnation": 0
        };
        
        let flowerCount = 0;

        this.items["flowers"].forEach((flower) => {
            this.input.setDraggable(flower)

            let [x, y] = [flower.x, flower.y]

            flower.on("drag", (pointer, dragX, dragY) => {
                flower.x = dragX
                flower.y = dragY
            })

            flower.on("dragend", () => {
                const flowerBounds = flower.getBounds()
                const vaseBounds = this.vase.getBounds()

                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(flowerBounds, vaseBounds)
                ) {
                    flowerCount += 1
                    flowersPlaced[flower.texture.key] += 1
                    flower.x = x
                    flower.y = y

                    this.tweens.add({
                        targets: flower,
                        x2,
                        y2,
                        duration: 500,
                        ease: "Power1",
                        yoyo: false,
                        repeat: 0,
                    })



                    if (flowerCount === 5) {
                        this.handleOrderComplete()
                    }
                }
            })
        })
    }

    showStory(message) {
      // Create background rectangle
      const background = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, 400, 200, 0x000000, 0.8);
      background.setDepth(100);
    
      // Create text object
      const text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, message, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 380, useAdvancedWrap: true }
      });
      text.setOrigin(0.5);
      text.setDepth(101);
    
      // Create button
      const button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Dismiss', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        backgroundColor: '#ff0000',
        padding: { x: 10, y: 5 }
      });
      button.setOrigin(0.5);
      button.setDepth(101);
      button.setInteractive({ useHandCursor: true });
    
        
      button.on('pointerdown', () => {
        background.destroy();
        text.destroy();
        button.destroy();
      }); 
      
    }

}
