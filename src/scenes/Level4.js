import { Scene } from 'phaser';

export class Level4 extends Scene
{
    constructor ()
    {
        super('Level4');
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
      console.log("Randomized level list:", this.randomizedLevels);

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
          "I'm excited for you!",
          "I'm happy for you for starting college!",
          "I'm sorry you're feeling anxious.",
          "I'm excited by your optimism.",
          "I'm glad you're excited about your roommate!",
        ],
        bunch2: [ // paraphrasing
          "It sounds like you're feeling a mix of excitement\n and anxiety.",
          "I'm hearing that you're nervous about being a\n good roommate.",
          "It seems like you might be overwhlemed about college.",
          "I'm understanding that you're anxious.",
          "It sounds like you're feeling a lot of pressure to\n be a good roommate.",
        ],
        bunch3: [ // empowerment
          "You're doing great.",
          "You're obviously self-aware, which is great.",
          "You're amazing.",
          "Anyone would be lucky to have you as a roommate.",
          "You've got this."
        ],
        bunch4: [ // information
          "First impressions aren't everything.",
          "You will adjust to living together relatively quickly.",
          "Different people have different living styles.",
          "Studies suggest random roommate experiences are more\n often neutral than extreme.",
          "Living with a roommate is a great way to develop\n conflict resolution skills.",
        ],
        bunch5: [ // validation
          "Your anxiety is totally valid.",
          "It's okay to feel mixed feelings right now.",
          "It's completely valid to feel this way.",
          "Lots of people feel like this about random roommates.",
          "You're not alone in this."
        ],
        bunch6: [ // contextualizing
          "The rest of your life will be what you make of it.",
          "There's so much potential ahead of you.",
          "Your future is full of possibilities!",
          "Change is innevitable, but that's what makes life so exciting.",
          "Don't worry, things will end up okay.",
        ],
        bunch7: [ // advice
          "You should try to be open and honest with your roommate.",
          "Just be yourself.",
          "Try to be open-minded.",
          "Be patient with both yourself and your roommate.",
          "Don't be afraid to ask for help.",
        ],
        bunch8: [ // gratitude
          "Thank you so much for sharing this with me.",
          "I really appreciate your openness.",
          "I feel grateful to be here for you.",
          "Thank you for trusting me with your feelings.",
          "I appreciate you."
        ]
      };

      this.flowerPlacementRanges = {
        bunch1: { xMin: 1190, xMax: 1230, yMin: 500, yMax: 540 }, // forget-me-not
        bunch2: { xMin: 1230, xMax: 1270, yMin: 490, yMax: 530 }, // lily
        bunch3: { xMin: 1180, xMax: 1250, yMin: 495, yMax: 535 }, // carnation
        bunch4: { xMin: 1200, xMax: 1240, yMin: 510, yMax: 550 }, // rose
        bunch5: { xMin: 1210, xMax: 1270, yMin: 495, yMax: 530 }, // tulip
        bunch6: { xMin: 1185, xMax: 1245, yMin: 500, yMax: 540 }, // violet
        bunch7: { xMin: 1200, xMax: 1250, yMin: 505, yMax: 545 }, // daisy
        bunch8: { xMin: 1195, xMax: 1235, yMin: 500, yMax: 540 }  // daffodil
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

        if (this.finishButton.hoverStartTime) {
          let hoverDuration = Date.now() - this.finishButton.hoverStartTime;
          console.log(`Hovered over finish button for ${hoverDuration}ms`);
        }
      })

      this.finishButton.on('pointerdown', () => {
        this.selectSound.play()
        this.logBouquetData();
        console.log("Level 1 finish button clicked");
    
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

      this.isStoryFrameOpen = true;

      this.storyFrame = this.add.image(-400, 350, "frame").setDepth(10).setScale(.7);
      this.storyText = this.add.text(-700, 115, "I have a randomly assigned roommate for my freshman college dorm, and I'm a little nervous. She seems nice from our texts so far, and it seems like we have a lot in common. I've heard all sorts of crazy roommate stories, and I feel psyched out. I really want to be friends. I'm excited, but also anxious. I don't want to be a bad roommate either.", {
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
              this.storyOpenTime = Date.now();
            }
        });
      });
  
      this.closeButton.preFX?.clear(); 
      let glow = this.closeButton.preFX?.addGlow("0xffffff", 1, 0, false);
      glow?.setActive(false);

      this.closeButton.on("pointerover", () => {
        this.hoverSound.play();
        glow?.setActive(true); 
        this.closeButton.setScale(0.22);
      });
    
      this.closeButton.on("pointerout", () => {
        glow?.setActive(false);
        this.closeButton.setScale(0.2);
      });
      
      this.storyOpenTime = 0;

      this.closeButton.on("pointerdown", () => {
          this.isStoryFrameOpen = false;
          this.selectSound.play();
          this.tweens.add({
              targets: [this.storyFrame, this.storyText, this.closeButton],
              x: -700, 
              duration: 300,
              ease: "Cubic.easeIn",
              onComplete: () => {
                  this.storyTab.setVisible(true);
                  const duration = Date.now() - this.storyOpenTime; 
                  console.log(`Story frame was open for ${duration / 1000} seconds`); // send to firebase
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
          this.isStoryFrameOpen = true;
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
                this.storyOpenTime = Date.now();
              }
          });
      });

    } 

    setupFlowerInteractions() {
        const bunchKeys = ["bunch1", "bunch2", "bunch3", "bunch4", "bunch5", "bunch6", "bunch7", "bunch8"];
      
        bunchKeys.forEach((key) => {
          const flower = this.flowers[key];
          console.log(this.flowers);
          const { x, y } = flower;

          if (!flower) {
            console.error(`Flower ${key} is undefined`);
            return;
          }

          flower.setInteractive();
          console.log(`${key} interactive: ${flower.input.enabled}`);
          
          this.input.setDraggable(flower);

          flower.on("pointerdown", (pointer) => {
            console.log(`Flower ${key} clicked`);

            flower.x = pointer.x;
            flower.y = pointer.y;
          });
      
          flower.on("drag", (pointer, dragX, dragY) => {
            flower.x = dragX;
            flower.y = dragY;
          });
      
          flower.on("pointerover", () => {
            if (this.isStoryFrameOpen) return;
            this.hoverSound.play();
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

              const range = this.flowerPlacementRanges[key];

              const flowerX = Phaser.Math.Between(range.xMin, range.xMax);
              const flowerY = Phaser.Math.Between(range.yMin, range.yMax);

              const flowerImage = this.add.image(flowerX, flowerY, this.getFlowerImageKey(key))
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1);
      
              flowerImage.flowerKey = key;
              this.flowersInVase.push(flowerImage);
              this.selectSound.play();
      
              const textSnippet = this.add.text(520, 710 + 70 * this.flowersPlaced, this.flowerTexts[key][this.currentTurn], { 
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
