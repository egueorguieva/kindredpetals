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
      this.hoverSound = this.sound.add("hover")

      const bg = this.add.image(0, 0, "shop-bg")
      bg.setOrigin(0, 0)
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)
      bg.setTint(0xFFFFFF)

      this.vase = this.add.image(1210, 550, 'vase')
      this.vase.setScale(0.5)
      this.vase.setDepth(1);
      this.vase.preFX.addShadow()

      this.setFlowers()
      // this.showOrder()

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
          .setDepth(2);
        flower.preFX.addShadow();
        return flower;
      }
    
      this.flowers = {
        bunch1: { x: 975, y: 253, key: "bunch1", scale: 0.37 }, 
        bunch2: { x: 785, y: 245, key: "bunch2", scale: 0.37 },
        bunch3: { x: 590, y: 245, key: "bunch3", scale: 0.37 },
        bunch4: { x: 420, y: 240, key: "bunch4", scale: 0.37 },
        bunch5: { x: 975, y: 440, key: "bunch5", scale: 0.37 },
        bunch6: { x: 790, y: 450, key: "bunch6", scale: 0.37 },
        bunch7: { x: 590, y: 445, key: "bunch7", scale: 0.37 },
        bunch8: { x: 400, y: 450, key: "bunch8", scale: 0.37 },
      }
    
      Object.entries(this.flowers).forEach(([key, flower]) => {
        const createdFlower = createFlower(flower.x, flower.y, flower.key);
    
        createdFlower.on("pointerover", () => {
            this.hoverSound.play();
            createdFlower.preFX.addGlow("0xffffff", 1, 0, false);
            createdFlower.setScale(0.39);
        });

        createdFlower.on("pointerout", () => {
            createdFlower.preFX.clear();
            createdFlower.setScale(0.37)
        });
    
        this.flowers[key] = createdFlower;
      });
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
            this.input.setDraggable(flower);

            const initialPosition = { x: flower.x, y: flower.y };

            flower.on("drag", (pointer, dragX, dragY) => {
                flower.x = dragX;
                flower.y = dragY;
            })

            flower.on("dragend", () => {
                const flowerBounds = flower.getBounds();
                const vaseBounds = this.vase.getBounds();

                if (Phaser.Geom.Intersects.RectangleToRectangle(flowerBounds, vaseBounds)) {
                    flowerCount += 1;
                    flowersPlaced[flower.texture.key] += 1;
                    flower.setPosition(initialPosition.x, initialPosition.y);

                    this.tweens.add({
                        targets: flower,
                        x: initialPosition.x,
                        y: initialPosition.y,
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
}
