import { Scene } from 'phaser';

export class Level1 extends Scene
{
    constructor ()
    {
        super('Level1');
    }

    preload () {
        this.load.image('shop-bg', 'assets/main-bg.png')
        this.load.image('flower1', 'assets/flower1.png')
        this.load.image('flower2', 'assets/flower2.png')
        this.load.image('flower3', 'assets/flower3.png')
        this.load.image('flower4', 'assets/flower4.png')
        this.load.image('flower5', 'assets/flower5.png')
        this.load.image('flower6', 'assets/flower6.png')
        this.load.image('flower7', 'assets/flower7.png')
        this.load.image('flower8', 'assets/flower8.png')
        this.load.image('vase', 'assets/vase.png')
    }

    create ()
    {
        const bg = this.add.image(0, 0, "shop-bg")
        bg.setOrigin(0, 0)
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

        this.vase = this.add.image(720, 630, 'vase')
        this.vase.setScale(0.8)
        this.vase.preFX.addShadow()

        this.setFlowers()
        // this.showStory()

        this.handleFirstFlower()
    }

    // markComponentAdded() {
    //     /* mechanics of exactly what happens when
    //     flower gets added to vase ? */

    //     this.currentFlower++
    // }

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
          flower1: { x: 1080, y: 115, key: "flower1", scale: 0.5 },
          flower2: { x: 850, y: 115, key: "flower2", scale: 0.5 },
          flower3: { x: 580, y: 115, key: "flower3", scale: 0.5 },
          flower4: { x: 310, y: 115, key: "flower4", scale: 0.5 },
          flower5: { x: 1080, y: 355, key: "flower5", scale: 0.5 },
          flower6: { x: 850, y: 355, key: "flower6", scale: 0.5 },
          flower7: { x: 580, y: 355, key: "flower7", scale: 0.5 },
          flower8: { x: 310, y: 355, key: "flower8", scale: 0.5 },
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
                glow = createdFlower.preFX.addGlow("000000", 1, 0, false)
            })
          createdFlower.on("pointerout", () => {
                glow?.setActive(false)
            })
    
          this.flowers[key] = createdFlower
        })

    }
    

    handleFirstFlower() {
        const { x, y } = this.items.flower1
    }


    showMessage(message) {
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
    
        // Add event listener to button
        button.on('pointerdown', () => {
            background.destroy();
            text.destroy();
            button.destroy();
        });
    }

}
