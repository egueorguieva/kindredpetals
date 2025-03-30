import { Scene } from 'phaser';

export class Level3 extends Scene
{
    constructor ()
    {
        super('Level3');
        this.textBubble = null;
    }

    preload () {
        this.load.image('shop-bg', 'assets/main-bg-4.png')
        this.load.image('frame', 'assets/order-board-4.png')
        this.load.image('bunch4', 'assets/roses-bunch.png')
        this.load.image('bunch2', 'assets/lilies-bunch.png')
        this.load.image('bunch7', 'assets/daisies-bunch.png')
        this.load.image('bunch1', 'assets/forget-me-nots-bunch.png')
        this.load.image('bunch5', 'assets/tulips-bunch.png')
        this.load.image('bunch6', 'assets/violets-bunch.png')
        this.load.image('bunch3', 'assets/carnations-bunch.png')
        this.load.image('bunch8', 'assets/daffodils-bunch.png')
        this.load.image('rose', 'assets/single-rose.png')
        this.load.image('lily', 'assets/single-lily.png')
        this.load.image('daisy', 'assets/single-daisy.png')
        this.load.image('daffodil', 'assets/single-daffodil.png')
        this.load.image('forgetmenot', 'assets/single-forgetmenot.png')
        this.load.image('tulip', 'assets/single-tulip.png')
        this.load.image('violet', 'assets/single-violet.png')
        this.load.image('carnation', 'assets/single-carnation.png')
        this.load.image('vase', 'assets/vase-4.png')
        this.load.image('shop', 'assets/shop-icon.png')
        this.load.image('coin', 'assets/coin.png')
        this.load.image('alert', 'assets/alert.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('rose2', 'assets/rose-2.png')
        this.load.image('violet2', 'assets/violet-2.png')
        this.load.image('exit-button', 'assets/exit.png')
        this.load.image('order-button', 'assets/order-button-2.png')
        this.load.image('bell', 'assets/bell.png')
        this.load.image('next-level', 'assets/next-level-2.png')
        this.load.image('delete', 'assets/delete-icon.png')
    }

    logBouquetData() {
      console.log('Flowers used: ', this.flowersInVase.map(flower => flower.flowerKey));
      console.log('Text snippets: ', this.addedTexts.map(text => text.text));
      console.log('Total flowers placed: ', this.flowersPlaced);
      console.log('Deletions: ', this.trashClicks);
      console.log('Deleted texts: ', this.deletedSnippets);
    }

    create ()
    {

      this.randomizedLevels = this.game.randomizedLevels;
      console.log("Randomized levels in Level 3:", this.randomizedLevels);

      this.hoverSound = this.sound.add("hover")
      this.selectSound = this.sound.add("select")
      this.alertSound = this.sound.add("alert")

      const bg = this.add.image(0, 0, "shop-bg")
      bg.setOrigin(0, 0)
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

      this.vase = this.add.image(1220, 495, 'vase')
      this.vase.setScale(0.38)
      this.vase.setDepth(1);
      this.vase.preFX.addShadow()

      /* this.shop = this.add.image(1380, 55, "star")
      this.shop.setScale(0.15)
      this.shop.setInteractive()

      let glow
      this.shop.on("pointerover", () => {
          this.hoverSound.play()
          glow = this.shop.preFX.addGlow("0xffffff", 1, 0, false)
          this.shop.setScale(0.17)
        })
      this.shop.on("pointerout", () => {
          glow?.setActive(false)
          this.shop.setScale(0.15)
        }) */

      this.trashClicks = 0;
      this.deletedSnippets = [];
      this.trash = this.add.image(1380, 60, "delete")
          .setScale(0.15)
          .setInteractive()
          .setDepth(2);

      let glow
      this.trash.on("pointerover", () => {
          this.trash.hoverStartTime = Date.now();
          this.hoverSound.play()
          glow = this.trash.preFX.addGlow("0xffffff", 1, 0, false)
          this.trash.setScale(0.17)
      });

      this.trash.on("pointerout", () => { 
          let hoverDuration = Date.now() - this.trash.hoverStartTime;
          console.log(`Hovered over trash for ${hoverDuration}ms`);
          glow?.setActive(false)
          this.trash.setScale(0.15)
      });

      this.trash.on("pointerdown", () => {
          this.selectSound.play();
          console.log("Trashcan clicked");
          this.trashClicks++;
          this.removeLastFlower();
      });

      this.flowersInVase = [];
      this.addedTexts = [];
      this.currentTurn = 0;
      this.flowersPlaced = 0;

      this.setFlowers();
      this.newOrder();

      console.log("textBubble:", this.textBubble);
      console.log("currentTurn:", this.currentTurn);

      this.flowerCounter = this.add.text(1100, 40, "Flowers: 0/5", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "PixelFont",
      }).setDepth(10);

      this.textBubble = this.add.text(0, 0, "", {
        fontSize: "24px",
        fill: "#fff",
        fontFamily: "PixelFont",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
        wordWrap: { width: 200, useAdvancedWrap: true },
      }).setVisible(false)
      .setDepth(10);

      this.flowerColors = {
        bunch1: "#0165FC", // forget-me-not color
        bunch2: "#964B00", // lily color
        bunch3: "#FF1694", // carnation color
        bunch4: "#FF0000", // rose color
        bunch5: "#FF4D00", // tulip color
        bunch6: "#7600BC", // violet color
        bunch7: "#FFFFFF", // daisy color
        bunch8: "#FFDE21"  // daffodil color
      }

      this.flowerTexts = {
        bunch1: [ // emotional expression
          "I'm excited to hear about your graduation!",
          "I'm sorry to hear you're feeling conflicted.",
          "I'm happy for you for graduating!",
          "I'm sorry about your anxiety.",
          ""
        ],
        bunch2: [ // paraphrasing
          "It sounds like you're feeling sad about graduating and \nmoving away from your college campus and friends.",
          "I'm hearing that you're feeling overwhelmed.",
          "Lily message 3",
          "Lily message 4",
          "Lily message 5"
        ],
        bunch3: [ // empowerment
          "You're doing such a great job.",
          "You've totally got this!",
          "You're amazing.",
          "You're so strong.",
          "You've got this."
        ],
        bunch4: [ // information
          "This sadness will go away with time as you settle into the \nnext phase of your life.",
          "College graduation is a huge milestone to process.",
          "message 3",
          "Rose message 4",
          "Rose message 5"
        ],
        bunch5: [ // validation
          "You're not alone in this.",
          "It's okay to feel mixed feelings right now.",
          "It's completely valid to feel this way.",
          "Lots of people feel like this around graduation.",
          "You're totally normal for feeling this way, it's a big change!"
        ],
        bunch6: [ // contextualizing
          "The rest of your life will be what you make of it.",
          "There's so much potential ahead of you.",
          "Your future is full of possibilities!",
          "Don't worry, things will end up okay.",
          "Change is innevitable, but that's what makes life so exciting.",
        ],
        bunch7: [ // advice
          "Daisy message 1",
          "Daisy message 2",
          "Daisy message 3",
          "Daisy message 4",
          "Daisy message 5"
        ],
        bunch8: [ // gratitude
          "Thank you so much for sharing this with me.",
          "I really appreciate your openness.",
          "I feel grateful to be here for you.",
          "Thank you for trusting me with your feelings.",
          "I appreciate you."
        ]
      };

      console.log("flowerTexts:", this.flowerTexts);

      this.setupFlowerInteractions();

      this.finishButton = this.add.sprite(1380, 550, 'next-level').setScale(.25).setDepth(2).setInteractive();

      this.finishButton.on("pointerover", () => {
        glow = this.finishButton.preFX.addGlow("0xffffff", 1, 0, false)
        this.hoverSound.play()
        this.finishButton.setScale(0.27)
      })
      this.finishButton.on("pointerout", () => {
        glow?.setActive(false)
        this.finishButton.setScale(0.25)
      })

      this.finishButton.on('pointerdown', () => {
        this.selectSound.play()
        this.logBouquetData();
        console.log("Level 3 finish button clicked");
    
        this.time.delayedCall(1000, () => {
          const currentIndex = this.randomizedLevels.findIndex(level => level.key === this.scene.key);
  
          if (currentIndex >= 0 && currentIndex < this.randomizedLevels.length - 1) {
            const nextLevelKey = this.randomizedLevels[currentIndex + 1].key;
            this.scene.start(nextLevelKey);
          } else {
            this.scene.start('MainMenu');
          }
        });
    });


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
        bunch1: { x: 975, y: 253, key: "bunch1", scale: 0.39 }, 
        bunch2: { x: 785, y: 245, key: "bunch2", scale: 0.37 },
        bunch3: { x: 590, y: 245, key: "bunch3", scale: 0.37 },
        bunch4: { x: 420, y: 240, key: "bunch4", scale: 0.37 },
        bunch5: { x: 975, y: 440, key: "bunch5", scale: 0.37 },
        bunch6: { x: 790, y: 450, key: "bunch6", scale: 0.37 },
        bunch7: { x: 590, y: 445, key: "bunch7", scale: 0.37 },
        bunch8: { x: 400, y: 450, key: "bunch8", scale: 0.37 },
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
            glow = createdFlower.preFX.addGlow("0xffffff", 1, 0, false)
            createdFlower.setScale(0.39)
          })
        createdFlower.on("pointerout", () => {
            glow?.setActive(false)
            createdFlower.setScale(0.37)
          })
    
        this.flowers[key] = createdFlower
      })
    }

    newOrder() {

      this.notice = this.add.image(1220, 275, "alert").setScale(0.25).setDepth(10).setVisible(false);

      this.time.delayedCall(400, () => {
        this.notice.setVisible(true);
        this.alertSound.play();
      });

      this.storyFrame = this.add.image(-400, 350, "frame").setDepth(10).setScale(.7);
      this.storyText = this.add.text(-700, 115, "I just graduated college. I was super excited leading up to it and also the day of, but I left my college town yesterday and cried the whole way home. I had a great time in college, and I'm also really excited to attend my dream graduate school this Fall. I guess my brain can't comprehend how quickly the time passed and began to realize that I'll never see some of those people again. I'm still excited for the future though. It's a weird feeling.", {
          fontSize: "32px",
          fill: "#000",
          wordWrap: { width: 700 },
          fontFamily: "PixelFont",
      }).setDepth(11);
  
      this.closeButton = this.add.image(-400, 75, "exit-button").setScale(0.2).setDepth(12).setInteractive();
      
      this.storyTab = this.add.image(1380, 135, "order-button").setScale(0.22).setDepth(9).setInteractive().setVisible(false);
  
      this.time.delayedCall(1200, () => {
        this.tweens.add({
          targets: this.storyFrame,
          x: 540, 
          duration: 1000,
          ease: "Cubic.easeOut",
        });

        this.tweens.add({
          targets: this.storyText,
          x: 70, 
          duration: 1000,
          ease: "Cubic.easeOut",
        });

        this.tweens.add({
            targets: this.closeButton,
            x: 820, 
            duration: 1000,
            ease: "Cubic.easeOut",
            onComplete: () => {
              this.notice.destroy();
            }
        });
      });
  
      let glow
      this.closeButton.on("pointerover", () => {
          this.hoverSound.play()
          glow = this.closeButton.preFX.addGlow("0xffffff", 1, 0, false)
          this.closeButton.setScale(0.22)
        })
      this.closeButton.on("pointerout", () => {
          glow?.setActive(false)
          this.closeButton.setScale(0.2)
        })

      this.closeButton.on("pointerdown", () => {
          this.tweens.add({
              targets: [this.storyFrame, this.storyText, this.closeButton],
              x: -700, 
              duration: 300,
              ease: "Cubic.easeIn",
              onComplete: () => {
                  this.storyTab.setVisible(true);
              }
          });
      });
  
      this.storyTab.on("pointerover", () => {
          this.hoverSound.play()
          glow = this.storyTab.preFX.addGlow("0xffffff", 1, 0, false)
          this.storyTab.setScale(0.24)
        })
      this.storyTab.on("pointerout", () => {
          glow?.setActive(false)
          this.storyTab.setScale(0.22)
        })

      this.storyTab.on("pointerdown", () => {
          console.log("Story tab clicked"); // send to firebase
          this.storyTab.setVisible(false);
          this.tweens.add({
            targets: this.storyFrame,
            x: 540, 
            duration: 1000,
            ease: "Cubic.easeOut",
          });
  
          this.tweens.add({
            targets: this.storyText,
            x: 70, 
            duration: 1000,
            ease: "Cubic.easeOut",
          });
  
          this.tweens.add({
              targets: this.closeButton,
              x: 820, 
              duration: 1000,
              ease: "Cubic.easeOut",
              onComplete: () => {
                this.notice.destroy();
              }
          });
      });

    } 

    setupFlowerInteractions() {
        const bunchKeys = ["bunch1", "bunch2", "bunch3", "bunch4", "bunch5", "bunch6", "bunch7", "bunch8"];
      
        bunchKeys.forEach((key) => {
          const flower = this.flowers[key];
          const { x, y } = flower;
          this.input.setDraggable(flower);
      
          flower.on("drag", (pointer, dragX, dragY) => {
            flower.x = dragX;
            flower.y = dragY;
          });
      
          flower.on("pointerover", () => {
            flower.hoverStartTime = Date.now();
            this.textBubble.setText(this.flowerTexts[key][this.currentTurn])
              .setPosition(flower.x + 70, flower.y - 30)
              .setVisible(true);
          });
      
          flower.on("pointerout", () => {
            this.textBubble.setVisible(false);
            if (flower.hoverStartTime) {
              let hoverDuration = Date.now() - flower.hoverStartTime;
              console.log(`Hovered over ${key} for ${hoverDuration}ms`);
            }
          });

          flower.on("dragstart", () => {
            console.log(`Started dragging ${key}`);
          });
      
          flower.on("dragend", () => {
            console.log(`Stopped dragging ${key}`);
            const flowerBounds = flower.getBounds();
            const vaseBounds = this.vase.getBounds();
      
            if (this.flowersPlaced < 5 && Phaser.Geom.Intersects.RectangleToRectangle(flowerBounds, vaseBounds)) {
              console.log(`Placed ${key} in vase with snippet: "${this.flowerTexts[key][this.currentTurn]}"`);
              const flowerImage = this.add.image(
                Phaser.Math.Between(1200, 1285), // random-ish vase positions
                Phaser.Math.Between(500, 540),
                this.getFlowerImageKey(key)
              )
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1);
      
              flowerImage.flowerKey = key;
              this.flowersInVase.push(flowerImage);
              this.selectSound.play();
      
              const textSnippet = this.add.text(520, 710 + 30 * this.flowersPlaced, this.flowerTexts[key][this.currentTurn], { 
                fontSize: "32px", 
                fill: this.flowerColors[key], 
                fontFamily: "PixelFont"
              });
              this.addedTexts.push(textSnippet);
      
              this.flowersPlaced++;
              this.currentTurn++;

              this.flowerCounter.setText(`Flowers: ${this.flowersPlaced}/5`);
              console.log("Current turn:", this.currentTurn);
      
              this.tweens.add({
                targets: flower,
                x: x,
                y: y,
                duration: 400,
                ease: "Power1",
              });
            } else {
              this.tweens.add({
                targets: flower,
                x: x,
                y: y,
                duration: 400,
                ease: "Power1",
              });
            }
          });
        });
    }

      getFlowerImageKey(key) {
        const mapping = {
          bunch1: "forgetmenot",
          bunch2: "lily",
          bunch3: "carnation",
          bunch4: "rose",
          bunch5: "tulip",
          bunch6: "violet",
          bunch7: "daisy",
          bunch8: "daffodil"
        };
        return mapping[key];
    }
      

    removeLastFlower() {
      if (this.flowersInVase.length > 0) {
          const lastFlower = this.flowersInVase.pop();
          const flowerKey = lastFlower.flowerKey; // Assuming `flowerKey` is how you track flower type
          lastFlower.destroy();
  
          const lastText = this.addedTexts.pop();
          if (lastText) { 
            lastText.destroy();
            this.deletedSnippets.push(lastText.text);
          } 
  
          this.flowersPlaced--;
          this.currentTurn--;

          this.flowerCounter.setText(`Flowers: ${this.flowersPlaced}/5`);
  
          console.log(`Deleted ${flowerKey} with snippet: "${this.flowerTexts[flowerKey][this.currentTurn]}"`, 
              "Turn:", this.currentTurn, 
              "Flowers in vase:", this.flowersInVase.length);
      } else {
          console.log("No flowers to remove");
      }
  }
      
}
