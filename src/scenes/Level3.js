import { Scene } from 'phaser';

export class Level3 extends Scene
{
  constructor () {
    super('Level3');
    this.textBubble = null;
    this.currentTurn = 0;
    this.currentFlower = 0;
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
    this.load.image('next-level', 'assets/next-level.png')
    this.load.image('delete', 'assets/delete-icon.png')
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

      this.shop = this.add.image(1380, 55, "star")
      this.shop.setScale(0.17)
      this.shop.setInteractive()

      let glow
      this.shop.on("pointerover", () => {
          this.hoverSound.play()
          glow = this.shop.preFX.addGlow("0xffffff", 1, 0, false)
          this.shop.setScale(0.19)
        })
      this.shop.on("pointerout", () => {
          glow?.setActive(false)
          this.shop.setScale(0.17)
        })

/*       this.startPoints = this.add.text(1310, 40, "0", {
        fontSize: "32px",
        fill: "#ffffff",
        fontFamily: "PixelFont",
      }).setDepth(2); */

      this.setFlowers()
      this.newOrder()

      this.trash = this.add.image(1380, 215, "delete")  
      .setScale(0.15)
      .setInteractive()
      .setDepth(2);
    
      this.trash.on("pointerdown", () => {
        console.log("Trashcan clicked");
        this.removeLastFlower();
      });

      this.flowersInVase = [];

      this.textBubble = this.add.text(0, 0, "", {
        fontSize: "24px",
        fill: "#fff",
        fontFamily: "PixelFont",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
        wordWrap: { width: 200, useAdvancedWrap: true },
      }).setVisible(false);

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
          "I'm so sorry to hear that!",
          "no",
          "yes",
          "woah",
          "nice"
        ],
        bunch2: [ // paraphrasing
          "It sounds like you're feeling sad about graduating and moving away from your college campus and friends.",
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
          "Rose message 2",
          "Rose message 3",
          "Rose message 4",
          "Rose message 5"
        ],
        bunch5: [ // validation
          "You're not alone in this.",
          "Everyone feels like this sometimes.",
          "It's completely valid to feel this way.",
          "Tulip message 4",
          "Tulip message 5"
        ],
        bunch6: [ // contextualizing
          "The rest of your life will be what you make of it.",
          "Violet message 2",
          "Violet message 3",
          "Violet message 4",
          "Violet message 5",
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

      this.handleFirstFlower()

    }

    newOrder() {

      this.notice = this.add.image(1220, 275, "alert").setScale(0.25).setDepth(10).setVisible(false);

      this.time.delayedCall(400, () => {
        this.notice.setVisible(true);
        this.alertSound.play();
      });

      this.storyFrame = this.add.image(-400, 350, "frame").setDepth(10).setScale(.7);
      this.storyText = this.add.text(-700, 115, "How do you stop ruminating on mistakes? I was the crazy neighbor today due to a misunderstanding and I quickly apologized because I was genuinely wrong. But I don't know how to shake off the feeling of being wrong? I feel like my neighbor is just going to forever think I'm insane. It feels like I don't express my words right at all and when I make a mistake I feel like it'll last forever.", {
          fontSize: "32px",
          fill: "#000",
          wordWrap: { width: 700 },
          fontFamily: "PixelFont",
      }).setDepth(11);
  
      this.closeButton = this.add.image(-400, 75, "exit-button").setScale(0.2).setDepth(12).setInteractive();
      
      this.storyTab = this.add.image(1380, 130, "order-button").setScale(0.2).setDepth(9).setInteractive().setVisible(false);
  
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
          this.storyTab.setScale(0.22)
        })
      this.storyTab.on("pointerout", () => {
          glow?.setActive(false)
          this.storyTab.setScale(0.2)
        })

      this.storyTab.on("pointerdown", () => {
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
    

    handleFirstFlower() {

      let flowersPlaced = 0

      const { x: x1, y: y1 } = this.flowers.bunch1
      this.input.setDraggable(this.flowers["bunch1"])

      this.flowers.bunch1.on("drag", (pointer, dragX, dragY) => {
        this.flowers.bunch1.x = dragX
        this.flowers.bunch1.y = dragY
      })

      this.flowers.bunch1.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch1[this.currentTurn])
          .setPosition(this.flowers.bunch1.x + 70, this.flowers.bunch1.y - 30)
          .setVisible(true);
      });

      this.flowers.bunch1.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch1"].on("dragend", () => {
        const flower1Bounds = this.flowers.bunch1.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower1Bounds,vaseBounds)) {
            this.add.image(1225, 515, "forgetmenot")
              .setScale(0.85)
              .setInteractive()
              .setDepth(this.vase.depth - 1)
            
            this.selectSound.play()
            this.flowers.bunch1.x = x1;
            this.flowers.bunch1.y = y1;

            this.add.text(520, 710, this.flowerTexts.bunch1[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch1, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleSecondFlower()
            
          }        

        this.tweens.add({
          targets: this.flowers.bunch1,
          x: x1,
          y: y1,
          duration: 400,
          ease: "Power1",
          yoyo: false,
          repeat: 0,
        })

      })

        const { x: x2, y: y2 } = this.flowers.bunch2
        this.input.setDraggable(this.flowers["bunch2"])
    
        this.flowers.bunch2.on("drag", (pointer, dragX, dragY) => {
          this.flowers.bunch2.x = dragX
          this.flowers.bunch2.y = dragY
        })

        this.flowers.bunch2.on("pointerover", () => {
          this.textBubble.setText(this.flowerTexts.bunch2[this.currentTurn])
            .setPosition(this.flowers.bunch2.x + 70, this.flowers.bunch2.y - 30)
            .setDepth(this.flowers.bunch1.depth + 1)
            .setVisible(true);
        });
  
        this.flowers.bunch2.on("pointerout", () => {
          this.textBubble.setVisible(false);
        });
  
        this.flowers["bunch2"].on("dragend", () => {
          const flower2Bounds = this.flowers.bunch2.getBounds()
          const vaseBounds = this.vase.getBounds()
      
          if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower2Bounds,vaseBounds)) {
              this.add.image(1285, 530, "lily")
                .setScale(0.9)
                .setInteractive()
                .setDepth(this.vase.depth - 1)
              
              this.selectSound.play()
              this.flowers.bunch2.x = x2;
              this.flowers.bunch2.y = y2;

              this.add.text(520, 710, this.flowerTexts.bunch2[this.currentTurn], { 
                fontSize: "32px", 
                fill: this.flowerColors.bunch2,
                fontFamily: "PixelFont"
              })
            
              flowersPlaced++
              this.currentTurn++
              this.handleSecondFlower()

            }

            this.tweens.add({
              targets: this.flowers.bunch2,
              x: x2,
              y: y2,
              duration: 400,
              ease: "Power1",
              yoyo: false,
              repeat: 0,
            })
              
          })

          const { x: x3, y: y3 } = this.flowers.bunch3
          this.input.setDraggable(this.flowers["bunch3"])

          this.flowers.bunch3.on("drag", (pointer, dragX, dragY) => {
            this.flowers.bunch3.x = dragX
            this.flowers.bunch3.y = dragY
          })

          this.flowers.bunch3.on("pointerover", () => {
            this.textBubble.setText(this.flowerTexts.bunch3[this.currentTurn])
              .setPosition(this.flowers.bunch3.x + 70, this.flowers.bunch3.y - 30)
              .setDepth(this.flowers.bunch1.depth + 1)
              .setVisible(true);
          });
    
          this.flowers.bunch3.on("pointerout", () => {
            this.textBubble.setVisible(false);
          });
          
          this.flowers["bunch3"].on("dragend", () => {
            const flower3Bounds = this.flowers.bunch3.getBounds()
            const vaseBounds = this.vase.getBounds()
        
            if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower3Bounds,vaseBounds)) {
                this.add.image(1225, 520, "carnation")
                  .setScale(0.8)
                  .setInteractive()
                  .setDepth(this.vase.depth - 1)

                this.selectSound.play()
                this.flowers.bunch3.x = x3;
                this.flowers.bunch3.y = y3;

                this.add.text(520, 710, this.flowerTexts.bunch3[this.currentTurn], { 
                  fontSize: "32px", 
                  fill: this.flowerColors.bunch3,  
                  fontFamily: "PixelFont"
                })
                  
                flowersPlaced++
                this.currentTurn++
                this.handleSecondFlower()
                  
              }

              this.tweens.add({
                targets: this.flowers.bunch3,
                x: x3,
                y: y3,
                duration: 400,
                ease: "Power1",
                yoyo: false,
                repeat: 0,
              })
                
            })

            const { x: x4, y: y4 } = this.flowers.bunch4
            this.input.setDraggable(this.flowers["bunch4"])

            this.flowers.bunch4.on("drag", (pointer, dragX, dragY) => {
              this.flowers.bunch4.x = dragX
              this.flowers.bunch4.y = dragY
            })

            this.flowers.bunch4.on("pointerover", () => {
              this.textBubble.setText(this.flowerTexts.bunch4[this.currentTurn])
                .setPosition(this.flowers.bunch4.x + 70, this.flowers.bunch4.y - 30)
                .setDepth(this.flowers.bunch1.depth + 1)
                .setVisible(true);
            });
      
            this.flowers.bunch4.on("pointerout", () => {
              this.textBubble.setVisible(false);
            });
            
            this.flowers["bunch4"].on("dragend", () => {
              const flower4Bounds = this.flowers.bunch4.getBounds()
              const vaseBounds = this.vase.getBounds()
          
              if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower4Bounds,vaseBounds)) {
                  this.add.image(1220, 520, "rose")
                    .setScale(0.9)
                    .setInteractive()
                    .setDepth(this.vase.depth - 1)
                  
                  this.selectSound.play()
                  this.flowers.bunch4.x = x4;
                  this.flowers.bunch4.y = y4;

                  this.add.text(520, 710, this.flowerTexts.bunch4[this.currentTurn], { 
                    fontSize: "32px", 
                    fill: this.flowerColors.bunch4, 
                    fontFamily: "PixelFont"
                  })

                  flowersPlaced++
                  this.currentTurn++
                  this.handleSecondFlower()

                }

                this.tweens.add({
                  targets: this.flowers.bunch4,
                  x: x4,
                  y: y4,
                  duration: 400,
                  ease: "Power1",
                  yoyo: false,
                  repeat: 0,
                })
                  
              })

              const { x: x5, y: y5 } = this.flowers.bunch5
              this.input.setDraggable(this.flowers["bunch5"])

              this.flowers.bunch5.on("drag", (pointer, dragX, dragY) => {
                this.flowers.bunch5.x = dragX
                this.flowers.bunch5.y = dragY
              })

              this.flowers.bunch5.on("pointerover", () => {
                this.textBubble.setText(this.flowerTexts.bunch5[this.currentTurn])
                  .setPosition(this.flowers.bunch5.x + 70, this.flowers.bunch5.y - 30)
                  .setDepth(this.flowers.bunch1.depth + 1)
                  .setVisible(true);
              });
        
              this.flowers.bunch5.on("pointerout", () => {
                this.textBubble.setVisible(false);
              });

              this.flowers["bunch5"].on("dragend", () => {
                const flower5Bounds = this.flowers.bunch5.getBounds()
                const vaseBounds = this.vase.getBounds()
            
                if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower5Bounds,vaseBounds)) {
                    this.add.image(1200, 500, "tulip")
                      .setScale(0.8)
                      .setInteractive()
                      .setDepth(this.vase.depth - 1)

                    this.selectSound.play()
                    this.flowers.bunch5.x = x5;
                    this.flowers.bunch5.y = y5;

                    this.add.text(520, 710, this.flowerTexts.bunch5[this.currentTurn], { 
                      fontSize: "32px", 
                      fill: this.flowerColors.bunch5,  
                      fontFamily: "PixelFont"
                    })

                    flowersPlaced++
                    this.currentTurn++
                    this.handleSecondFlower()
      
                  }

                  this.tweens.add({
                    targets: this.flowers.bunch5,
                    x: x5,
                    y: y5,
                    duration: 400,
                    ease: "Power1",
                    yoyo: false,
                    repeat: 0,
                  })
                    
                })

                const { x: x6, y: y6 } = this.flowers.bunch6
                this.input.setDraggable(this.flowers["bunch6"])

                this.flowers.bunch6.on("drag", (pointer, dragX, dragY) => {
                  this.flowers.bunch6.x = dragX
                  this.flowers.bunch6.y = dragY
                })

                this.flowers.bunch6.on("pointerover", () => {
                  this.textBubble.setText(this.flowerTexts.bunch6[this.currentTurn])
                    .setPosition(this.flowers.bunch6.x + 70, this.flowers.bunch6.y - 30)
                    .setDepth(this.flowers.bunch1.depth + 1)
                    .setVisible(true);
                });
          
                this.flowers.bunch6.on("pointerout", () => {
                  this.textBubble.setVisible(false);
                });

                this.flowers["bunch6"].on("dragend", () => {
                  const flower6Bounds = this.flowers.bunch6.getBounds()
                  const vaseBounds = this.vase.getBounds()
              
                  if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower6Bounds,vaseBounds)) {
                      this.add.image(1230, 540, "violet")
                        .setScale(0.8)
                        .setInteractive()
                        .setDepth(this.vase.depth - 1)

                      this.selectSound.play()
                      this.flowers.bunch6.x = x6;
                      this.flowers.bunch6.y = y6;

                      this.add.text(520, 710, this.flowerTexts.bunch6[this.currentTurn], { 
                        fontSize: "32px", 
                        fill: this.flowerColors.bunch6,  
                        fontFamily: "PixelFont"
                      })

                      flowersPlaced++
                      this.currentTurn++
                      this.handleSecondFlower()
        
                    }

                    this.tweens.add({
                      targets: this.flowers.bunch6,
                      x: x6,
                      y: y6,
                      duration: 400,
                      ease: "Power1",
                      yoyo: false,
                      repeat: 0,
                    })
                      
                  })

                  const { x: x7, y: y7 } = this.flowers.bunch7
                  this.input.setDraggable(this.flowers["bunch7"])

                  this.flowers.bunch7.on("drag", (pointer, dragX, dragY) => {
                    this.flowers.bunch7.x = dragX
                    this.flowers.bunch7.y = dragY
                  })

                  this.flowers.bunch7.on("pointerover", () => {
                    this.textBubble.setText(this.flowerTexts.bunch7[this.currentTurn])
                      .setPosition(this.flowers.bunch7.x + 70, this.flowers.bunch7.y - 30)
                      .setDepth(this.flowers.bunch1.depth + 1)
                      .setVisible(true);
                  });
            
                  this.flowers.bunch7.on("pointerout", () => {
                    this.textBubble.setVisible(false);
                  });

                  this.flowers["bunch7"].on("dragend", () => {
                    const flower7Bounds = this.flowers.bunch7.getBounds()
                    const vaseBounds = this.vase.getBounds()
                
                    if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower7Bounds,vaseBounds)) {
                        this.add.image(1220, 535, "daisy")
                          .setScale(0.9)
                          .setInteractive()
                          .setDepth(this.vase.depth - 1)

                        this.selectSound.play()
                        this.flowers.bunch7.x = x7;
                        this.flowers.bunch7.y = y7;

                        this.add.text(520, 710, this.flowerTexts.bunch7[this.currentTurn], { 
                          fontSize: "32px", 
                          fill: this.flowerColors.bunch7,  
                          fontFamily: "PixelFont"
                        })

                        flowersPlaced++
                        this.currentTurn++
                        this.handleSecondFlower()
          
                      }

                      this.tweens.add({
                        targets: this.flowers.bunch7,
                        x: x7,
                        y: y7,
                        duration: 400,
                        ease: "Power1",
                        yoyo: false,
                        repeat: 0,
                      })
                        
                    })

                    const { x: x8, y: y8 } = this.flowers.bunch8
                    this.input.setDraggable(this.flowers["bunch8"])

                    this.flowers.bunch8.on("drag", (pointer, dragX, dragY) => {
                      this.flowers.bunch8.x = dragX
                      this.flowers.bunch8.y = dragY
                    })

                    this.flowers.bunch8.on("pointerover", () => {
                      this.textBubble.setText(this.flowerTexts.bunch8[this.currentTurn])
                        .setPosition(this.flowers.bunch8.x + 70, this.flowers.bunch8.y - 30)
                        .setDepth(this.flowers.bunch1.depth + 1)
                        .setVisible(true);
                    });
              
                    this.flowers.bunch8.on("pointerout", () => {
                      this.textBubble.setVisible(false);
                    });

                    this.flowers["bunch8"].on("dragend", () => {
                      const flower8Bounds = this.flowers.bunch8.getBounds()
                      const vaseBounds = this.vase.getBounds()
                  
                      if (flowersPlaced === 0 && Phaser.Geom.Intersects.RectangleToRectangle(flower8Bounds,vaseBounds)) {
                          this.add.image(1220, 530, "daffodil")
                            .setScale(0.8)
                            .setInteractive()
                            .setDepth(this.vase.depth - 1)

                          this.selectSound.play()
                          this.flowers.bunch8.x = x8;
                          this.flowers.bunch8.y = y8;

                          this.add.text(520, 710, this.flowerTexts.bunch8[this.currentTurn], { 
                            fontSize: "32px", 
                            fill: this.flowerColors.bunch8, 
                            fontFamily: "PixelFont"
                          })

                          flowersPlaced++
                          this.currentTurn++
                          this.handleSecondFlower()
                        }

                        this.tweens.add({
                          targets: this.flowers.bunch8,
                          x: x8,
                          y: y8,
                          duration: 400,
                          ease: "Power1",
                          yoyo: false,
                          repeat: 0,
                        })
                          
                      })
    }

    handleSecondFlower() {

      let flowersPlaced = 1

      const { x: x1, y: y1 } = this.flowers.bunch1
      this.input.setDraggable(this.flowers["bunch1"])

      this.flowers.bunch1.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch1[this.currentTurn])
          .setPosition(this.flowers.bunch1.x + 70, this.flowers.bunch1.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch1.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch1"].on("dragend", () => {
        const flower1Bounds = this.flowers.bunch1.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower1Bounds,vaseBounds)) {
            this.add.image(1205, 515, "forgetmenot")
              .setScale(0.85)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch1.x = x1;
            this.flowers.bunch1.y = y1;

            this.add.text(520, 770, this.flowerTexts.bunch1[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch1, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleThirdFlower()
          }
        })

        const { x: x2, y: y2 } = this.flowers.bunch2
        this.input.setDraggable(this.flowers["bunch2"])

        this.flowers.bunch2.on("pointerover", () => {
          this.textBubble.setText(this.flowerTexts.bunch2[this.currentTurn])
            .setPosition(this.flowers.bunch2.x + 70, this.flowers.bunch2.y - 30)
            .setDepth(this.flowers.bunch1.depth + 1)
            .setVisible(true);
        });
  
        this.flowers.bunch2.on("pointerout", () => {
          this.textBubble.setVisible(false);
        });

        this.flowers["bunch2"].on("dragend", () => {
          const flower2Bounds = this.flowers.bunch2.getBounds()
          const vaseBounds = this.vase.getBounds()
      
          if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower2Bounds,vaseBounds)) {
              this.add.image(1250, 490, "lily")
                .setScale(0.9)
                .setInteractive()
                .setDepth(this.vase.depth - 1)
              
              this.selectSound.play()
              this.flowers.bunch2.x = x2;
              this.flowers.bunch2.y = y2;

              this.add.text(520, 770, this.flowerTexts.bunch2[this.currentTurn], { 
                fontSize: "32px", 
                fill: this.flowerColors.bunch2,  
                fontFamily: "PixelFont"
              })
            
              flowersPlaced++
              this.currentTurn++
              this.handleThirdFlower()

            }
              
          })

          const { x: x3, y: y3 } = this.flowers.bunch3
          this.input.setDraggable(this.flowers["bunch3"])

          this.flowers.bunch3.on("pointerover", () => {
            this.textBubble.setText(this.flowerTexts.bunch3[this.currentTurn])
              .setPosition(this.flowers.bunch3.x + 70, this.flowers.bunch3.y - 30)
              .setDepth(this.flowers.bunch1.depth + 1)
              .setVisible(true);
          });
    
          this.flowers.bunch3.on("pointerout", () => {
            this.textBubble.setVisible(false);
          });

          this.flowers["bunch3"].on("dragend", () => {
            const flower3Bounds = this.flowers.bunch3.getBounds()
            const vaseBounds = this.vase.getBounds()
        
            if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower3Bounds,vaseBounds)) {
                this.add.image(1200, 500, "carnation")
                  .setScale(0.8)
                  .setInteractive()
                  .setDepth(this.vase.depth - 1)

                this.selectSound.play()
                this.flowers.bunch3.x = x3;
                this.flowers.bunch3.y = y3;

                this.add.text(520, 770, this.flowerTexts.bunch3[this.currentTurn], { 
                  fontSize: "32px", 
                  fill: this.flowerColors.bunch3, 
                  fontFamily: "PixelFont"
                })
                  
                flowersPlaced++
                this.currentTurn++
                this.handleThirdFlower()
                
              }
                
            })

            const { x: x4, y: y4 } = this.flowers.bunch4
            this.input.setDraggable(this.flowers["bunch4"])

            this.flowers.bunch4.on("pointerover", () => {
              this.textBubble.setText(this.flowerTexts.bunch4[this.currentTurn])
                .setPosition(this.flowers.bunch4.x + 70, this.flowers.bunch4.y - 30)
                .setDepth(this.flowers.bunch1.depth + 1)
                .setVisible(true);
            });
      
            this.flowers.bunch4.on("pointerout", () => {
              this.textBubble.setVisible(false);
            });

            this.flowers["bunch4"].on("dragend", () => {
              const flower4Bounds = this.flowers.bunch4.getBounds()
              const vaseBounds = this.vase.getBounds()
          
              if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower4Bounds,vaseBounds)) {
                  this.add.image(1190, 520, "rose")
                    .setScale(0.9)
                    .setInteractive()
                    .setDepth(this.vase.depth - 1)

                  this.selectSound.play()
                  this.flowers.bunch4.x = x4;
                  this.flowers.bunch4.y = y4;

                  this.add.text(520, 770, this.flowerTexts.bunch4[this.currentTurn], { 
                    fontSize: "32px", 
                    fill: this.flowerColors.bunch4, 
                    fontFamily: "PixelFont"
                  })

                  flowersPlaced++
                  this.currentTurn++
                  this.handleThirdFlower()

                }
              })

              const { x: x5, y: y5 } = this.flowers.bunch5
              this.input.setDraggable(this.flowers["bunch5"])

              this.flowers.bunch5.on("pointerover", () => {
                this.textBubble.setText(this.flowerTexts.bunch5[this.currentTurn])
                  .setPosition(this.flowers.bunch5.x + 70, this.flowers.bunch5.y - 30)
                  .setDepth(this.flowers.bunch1.depth + 1)
                  .setVisible(true);
              });
        
              this.flowers.bunch5.on("pointerout", () => {
                this.textBubble.setVisible(false);
              });

              this.flowers["bunch5"].on("dragend", () => {
                const flower5Bounds = this.flowers.bunch5.getBounds()
                const vaseBounds = this.vase.getBounds()
            
                if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower5Bounds,vaseBounds)) {
                    this.add.image(1180, 500, "tulip")
                      .setScale(0.8)
                      .setInteractive()
                      .setDepth(this.vase.depth - 1)

                    this.selectSound.play()
                    this.flowers.bunch5.x = x5;
                    this.flowers.bunch5.y = y5;

                    this.add.text(520, 770, this.flowerTexts.bunch5[this.currentTurn], { 
                      fontSize: "32px", 
                      fill: this.flowerColors.bunch5, 
                      fontFamily: "PixelFont"
                    })

                    flowersPlaced++
                    this.currentTurn++
                    this.handleThirdFlower()
      
                  }
                    
                })

                const { x: x6, y: y6 } = this.flowers.bunch6
                this.input.setDraggable(this.flowers["bunch6"])

                this.flowers.bunch6.on("pointerover", () => {
                  this.textBubble.setText(this.flowerTexts.bunch6[this.currentTurn])
                    .setPosition(this.flowers.bunch6.x + 70, this.flowers.bunch6.y - 30)
                    .setDepth(this.flowers.bunch1.depth + 1)
                    .setVisible(true);
                });
          
                this.flowers.bunch6.on("pointerout", () => {
                  this.textBubble.setVisible(false);
                });

                this.flowers["bunch6"].on("dragend", () => {
                  const flower6Bounds = this.flowers.bunch6.getBounds()
                  const vaseBounds = this.vase.getBounds()
              
                  if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower6Bounds,vaseBounds)) {
                      this.add.image(1210, 540, "violet")
                        .setScale(0.8)
                        .setInteractive()
                        .setDepth(this.vase.depth - 1)

                      this.selectSound.play()
                      this.flowers.bunch6.x = x6;
                      this.flowers.bunch6.y = y6;

                      this.add.text(520, 770, this.flowerTexts.bunch6[this.currentTurn], { 
                        fontSize: "32px", 
                        fill: this.flowerColors.bunch6, 
                        fontFamily: "PixelFont"
                      })

                      flowersPlaced++
                      this.currentTurn++
                      this.handleThirdFlower()
        
                    }
                      
                  }
                )

                const { x: x7, y: y7 } = this.flowers.bunch7
                this.input.setDraggable(this.flowers["bunch7"])

                this.flowers.bunch7.on("pointerover", () => {
                  this.textBubble.setText(this.flowerTexts.bunch7[this.currentTurn])
                    .setPosition(this.flowers.bunch7.x + 70, this.flowers.bunch7.y - 30)
                    .setDepth(this.flowers.bunch1.depth + 1)
                    .setVisible(true);
                });
          
                this.flowers.bunch7.on("pointerout", () => {
                  this.textBubble.setVisible(false);
                });

                this.flowers["bunch7"].on("dragend", () => {
                  const flower7Bounds = this.flowers.bunch7.getBounds()
                  const vaseBounds = this.vase.getBounds()
              
                  if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower7Bounds,vaseBounds)) {
                      this.add.image(1200, 535, "daisy")
                        .setScale(0.9)
                        .setInteractive()
                        .setDepth(this.vase.depth - 1)
                      
                      this.selectSound.play()
                      this.flowers.bunch7.x = x7;
                      this.flowers.bunch7.y = y7;

                      this.add.text(520, 770, this.flowerTexts.bunch7[this.currentTurn], { 
                        fontSize: "32px", 
                        fill: this.flowerColors.bunch7, 
                        fontFamily: "PixelFont"
                      })

                      flowersPlaced++
                      this.currentTurn++
                      this.handleThirdFlower()
          
                    }
                      
                  })

                  const { x: x8, y: y8 } = this.flowers.bunch8
                  this.input.setDraggable(this.flowers["bunch8"])

                  this.flowers.bunch8.on("pointerover", () => {
                    this.textBubble.setText(this.flowerTexts.bunch8[this.currentTurn])
                      .setPosition(this.flowers.bunch8.x + 70, this.flowers.bunch8.y - 30)
                      .setDepth(this.flowers.bunch1.depth + 1)
                      .setVisible(true);
                  });
            
                  this.flowers.bunch8.on("pointerout", () => {
                    this.textBubble.setVisible(false);
                  });

                  this.flowers["bunch8"].on("dragend", () => {
                    const flower8Bounds = this.flowers.bunch8.getBounds()
                    const vaseBounds = this.vase.getBounds()
                
                    if (flowersPlaced === 1 && Phaser.Geom.Intersects.RectangleToRectangle(flower8Bounds,vaseBounds)) {
                        this.add.image(1190, 520, "daffodil")
                          .setScale(0.8)
                          .setInteractive()
                          .setDepth(this.vase.depth - 1)

                        this.selectSound.play()
                        this.flowers.bunch8.x = x8;
                        this.flowers.bunch8.y = y8;

                        this.add.text(520, 770, this.flowerTexts.bunch8[this.currentTurn], { 
                          fontSize: "32px", 
                          fill: this.flowerColors.bunch8, 
                          fontFamily: "PixelFont"
                        })

                        flowersPlaced++
                        this.currentTurn++
                        this.handleThirdFlower()
            
                      }
                        
                    })
    }

    handleThirdFlower() {
      let flowersPlaced = 2

      const { x: x1, y: y1 } = this.flowers.bunch1
      this.input.setDraggable(this.flowers["bunch1"])

      this.flowers.bunch1.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch1[this.currentTurn])
          .setPosition(this.flowers.bunch1.x + 70, this.flowers.bunch1.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch1.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch1"].on("dragend", () => {
        const flower1Bounds = this.flowers.bunch1.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower1Bounds,vaseBounds)) {
            this.add.image(1180, 520, "forgetmenot")
              .setScale(0.85)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch1.x = x1;
            this.flowers.bunch1.y = y1;

            this.add.text(520, 830, this.flowerTexts.bunch1[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch1, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x2, y: y2 } = this.flowers.bunch2
      this.input.setDraggable(this.flowers["bunch2"])

      this.flowers.bunch2.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch2[this.currentTurn])
          .setPosition(this.flowers.bunch2.x + 70, this.flowers.bunch2.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch2.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch2"].on("dragend", () => {
        const flower2Bounds = this.flowers.bunch2.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower2Bounds,vaseBounds)) {
            this.add.image(1225, 510, "lily")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch2.x = x2;
            this.flowers.bunch2.y = y2;

            this.add.text(520, 830, this.flowerTexts.bunch2[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch2, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x3, y: y3 } = this.flowers.bunch3
      this.input.setDraggable(this.flowers["bunch3"])

      this.flowers.bunch3.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch3[this.currentTurn])
          .setPosition(this.flowers.bunch3.x + 70, this.flowers.bunch3.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch3.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch3"].on("dragend", () => {
        const flower3Bounds = this.flowers.bunch3.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower3Bounds,vaseBounds)) {
            this.add.image(1170, 520, "carnation")
              .setScale(0.7)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch3.x = x3;
            this.flowers.bunch3.y = y3;

            this.add.text(520, 830, this.flowerTexts.bunch3[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch3, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x4, y: y4 } = this.flowers.bunch4
      this.input.setDraggable(this.flowers["bunch4"])

      this.flowers.bunch4.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch4[this.currentTurn])
          .setPosition(this.flowers.bunch4.x + 70, this.flowers.bunch4.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch4.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch4"].on("dragend", () => {
        const flower4Bounds = this.flowers.bunch4.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower4Bounds,vaseBounds)) {
            this.add.image(1160, 510, "rose")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch4.x = x4;
            this.flowers.bunch4.y = y4;

            this.add.text(520, 830, this.flowerTexts.bunch4[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch4, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x5, y: y5 } = this.flowers.bunch5
      this.input.setDraggable(this.flowers["bunch5"])

      this.flowers.bunch5.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch5[this.currentTurn])
          .setPosition(this.flowers.bunch5.x + 70, this.flowers.bunch5.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch5.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch5"].on("dragend", () => {
        const flower5Bounds = this.flowers.bunch5.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower5Bounds,vaseBounds)) {
            this.add.image(1160, 500, "tulip")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch5.x = x5;
            this.flowers.bunch5.y = y5;

            this.add.text(520, 830, this.flowerTexts.bunch5[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch5, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x6, y: y6 } = this.flowers.bunch6
      this.input.setDraggable(this.flowers["bunch6"])

      this.flowers.bunch6.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch6[this.currentTurn])
          .setPosition(this.flowers.bunch6.x + 70, this.flowers.bunch6.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch6.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch6"].on("dragend", () => {
        const flower6Bounds = this.flowers.bunch6.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower6Bounds,vaseBounds)) {
            this.add.image(1190, 540, "violet")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)
            
            this.selectSound.play()
            this.flowers.bunch6.x = x6;
            this.flowers.bunch6.y = y6;

            this.add.text(520, 830, this.flowerTexts.bunch6[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch6, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x7, y: y7 } = this.flowers.bunch7
      this.input.setDraggable(this.flowers["bunch7"])

      this.flowers.bunch7.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch7[this.currentTurn])
          .setPosition(this.flowers.bunch7.x + 70, this.flowers.bunch7.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch7.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch7"].on("dragend", () => {
        const flower7Bounds = this.flowers.bunch7.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower7Bounds,vaseBounds)) {
            this.add.image(1180, 535, "daisy")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch7.x = x7;
            this.flowers.bunch7.y = y7;

            this.add.text(520, 830, this.flowerTexts.bunch7[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch7, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )

      const { x: x8, y: y8 } = this.flowers.bunch8
      this.input.setDraggable(this.flowers["bunch8"])

      this.flowers.bunch8.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch8[this.currentTurn])
          .setPosition(this.flowers.bunch8.x + 70, this.flowers.bunch8.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch8.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch8"].on("dragend", () => {
        const flower8Bounds = this.flowers.bunch8.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 2 && Phaser.Geom.Intersects.RectangleToRectangle(flower8Bounds,vaseBounds)) {
            this.add.image(1170, 535, "daffodil")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch8.x = x8;
            this.flowers.bunch8.y = y8;

            this.add.text(520, 830, this.flowerTexts.bunch8[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch8, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFourthFlower()
            
          }
        }
      )      
    }

    handleFourthFlower() {
      let flowersPlaced = 3

      const { x: x1, y: y1 } = this.flowers.bunch1
      this.input.setDraggable(this.flowers["bunch1"])

      this.flowers.bunch1.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch1[this.currentTurn])
          .setPosition(this.flowers.bunch1.x + 70, this.flowers.bunch1.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch1.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch1"].on("dragend", () => {
        const flower1Bounds = this.flowers.bunch1.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower1Bounds,vaseBounds)) {
            this.add.image(1195, 530, "forgetmenot")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch1.x = x1;
            this.flowers.bunch1.y = y1;

            this.add.text(520, 890, this.flowerTexts.bunch1[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch1,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
          
        }
      )

      const { x: x2, y: y2 } = this.flowers.bunch2
      this.input.setDraggable(this.flowers["bunch2"])

      this.flowers.bunch2.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch2[this.currentTurn])
          .setPosition(this.flowers.bunch2.x + 70, this.flowers.bunch2.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch2.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch2"].on("dragend", () => {
        const flower2Bounds = this.flowers.bunch2.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower2Bounds,vaseBounds)) {
            this.add.image(1270, 500, "lily")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)
            
            this.selectSound.play()
            this.flowers.bunch2.x = x2;
            this.flowers.bunch2.y = y2;

            this.add.text(520, 890, this.flowerTexts.bunch2[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch2,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x3, y: y3 } = this.flowers.bunch3
      this.input.setDraggable(this.flowers["bunch3"])

      this.flowers.bunch3.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch3[this.currentTurn])
          .setPosition(this.flowers.bunch3.x + 70, this.flowers.bunch3.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch3.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch3"].on("dragend", () => {
        const flower3Bounds = this.flowers.bunch3.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower3Bounds,vaseBounds)) {
            this.add.image(1215, 530, "carnation")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch3.x = x3;
            this.flowers.bunch3.y = y3;

            this.add.text(520, 890, this.flowerTexts.bunch3[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch3, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x4, y: y4 } = this.flowers.bunch4
      this.input.setDraggable(this.flowers["bunch4"])

      this.flowers.bunch4.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch4[this.currentTurn])
          .setPosition(this.flowers.bunch4.x + 70, this.flowers.bunch4.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch4.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch4"].on("dragend", () => {
        const flower4Bounds = this.flowers.bunch4.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower4Bounds,vaseBounds)) {
            this.add.image(1200, 540, "rose")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch4.x = x4;
            this.flowers.bunch4.y = y4;

            this.add.text(520, 890, this.flowerTexts.bunch4[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch4, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x5, y: y5 } = this.flowers.bunch5
      this.input.setDraggable(this.flowers["bunch5"])

      this.flowers.bunch5.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch5[this.currentTurn])
          .setPosition(this.flowers.bunch5.x + 70, this.flowers.bunch5.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch5.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch5"].on("dragend", () => {
        const flower5Bounds = this.flowers.bunch5.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower5Bounds,vaseBounds)) {
            this.add.image(1190, 550, "tulip")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch5.x = x5;
            this.flowers.bunch5.y = y5;

            this.add.text(520, 890, this.flowerTexts.bunch5[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch5, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x6, y: y6 } = this.flowers.bunch6
      this.input.setDraggable(this.flowers["bunch6"])

      this.flowers.bunch6.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch6[this.currentTurn])
          .setPosition(this.flowers.bunch6.x + 70, this.flowers.bunch6.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch6.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch6"].on("dragend", () => {
        const flower6Bounds = this.flowers.bunch6.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower6Bounds,vaseBounds)) {
            this.add.image(1210, 555, "violet")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch6.x = x6;
            this.flowers.bunch6.y = y6;

            this.add.text(520, 890, this.flowerTexts.bunch6[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch6, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x7, y: y7 } = this.flowers.bunch7
      this.input.setDraggable(this.flowers["bunch7"])

      this.flowers.bunch7.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch7[this.currentTurn])
          .setPosition(this.flowers.bunch7.x + 70, this.flowers.bunch7.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch7.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch7"].on("dragend", () => {
        const flower7Bounds = this.flowers.bunch7.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower7Bounds,vaseBounds)) {
            this.add.image(1215, 560, "daisy")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch7.x = x7;
            this.flowers.bunch7.y = y7;

            this.add.text(520, 890, this.flowerTexts.bunch7[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch7, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )

      const { x: x8, y: y8 } = this.flowers.bunch8
      this.input.setDraggable(this.flowers["bunch8"])

      this.flowers.bunch8.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch8[this.currentTurn])
          .setPosition(this.flowers.bunch8.x + 70, this.flowers.bunch8.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch8.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch8"].on("dragend", () => {
        const flower8Bounds = this.flowers.bunch8.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 3 && Phaser.Geom.Intersects.RectangleToRectangle(flower8Bounds,vaseBounds)) {
            this.add.image(1215, 550, "daffodil")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)
            
            this.selectSound.play()
            this.flowers.bunch8.x = x8;
            this.flowers.bunch8.y = y8;

            this.add.text(520, 890, this.flowerTexts.bunch8[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch8, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.handleFifthFlower()
            
          }
        }
      )
    }

    handleFifthFlower() {
      let flowersPlaced = 4

      const { x: x1, y: y1 } = this.flowers.bunch1
      this.input.setDraggable(this.flowers["bunch1"])

      this.flowers.bunch1.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch1[this.currentTurn])
          .setPosition(this.flowers.bunch1.x + 70, this.flowers.bunch1.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch1.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch1"].on("dragend", () => {
        const flower1Bounds = this.flowers.bunch1.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower1Bounds,vaseBounds)) {
            this.add.image(1215, 530, "forgetmenot")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch1.x = x1;
            this.flowers.bunch1.y = y1;

            this.add.text(520, 950, this.flowerTexts.bunch1[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch1, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
          
        }
      )

      const { x: x2, y: y2 } = this.flowers.bunch2
      this.input.setDraggable(this.flowers["bunch2"])

      this.flowers.bunch2.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch2[this.currentTurn])
          .setPosition(this.flowers.bunch2.x + 70, this.flowers.bunch2.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch2.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch2"].on("dragend", () => {
        const flower2Bounds = this.flowers.bunch2.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower2Bounds,vaseBounds)) {
            this.add.image(1240, 540, "lily")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch2.x = x2;
            this.flowers.bunch2.y = y2;

            this.add.text(520, 950, this.flowerTexts.bunch2[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch2, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x3, y: y3 } = this.flowers.bunch3
      this.input.setDraggable(this.flowers["bunch3"])

      this.flowers.bunch3.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch3[this.currentTurn])
          .setPosition(this.flowers.bunch3.x + 70, this.flowers.bunch3.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch3.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch3"].on("dragend", () => {
        const flower3Bounds = this.flowers.bunch3.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower3Bounds,vaseBounds)) {
            this.add.image(1190, 535, "carnation")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch3.x = x3;
            this.flowers.bunch3.y = y3;


            this.add.text(520, 950, this.flowerTexts.bunch3[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch3,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x4, y: y4 } = this.flowers.bunch4
      this.input.setDraggable(this.flowers["bunch4"])

      this.flowers.bunch4.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch4[this.currentTurn])
          .setPosition(this.flowers.bunch4.x + 70, this.flowers.bunch4.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch4.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch4"].on("dragend", () => {
        const flower4Bounds = this.flowers.bunch4.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower4Bounds,vaseBounds)) {
            this.add.image(1160, 530, "rose")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch4.x = x4;
            this.flowers.bunch4.y = y4;


            this.add.text(520, 950, this.flowerTexts.bunch4[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch4,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x5, y: y5 } = this.flowers.bunch5
      this.input.setDraggable(this.flowers["bunch5"])

      this.flowers.bunch5.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch5[this.currentTurn])
          .setPosition(this.flowers.bunch5.x + 70, this.flowers.bunch5.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch5.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch5"].on("dragend", () => {
        const flower5Bounds = this.flowers.bunch5.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower5Bounds,vaseBounds)) {
            this.add.image(1170, 550, "tulip")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch5.x = x5;
            this.flowers.bunch5.y = y5;


            this.add.text(520, 950, this.flowerTexts.bunch5[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch5,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x6, y: y6 } = this.flowers.bunch6
      this.input.setDraggable(this.flowers["bunch6"])

      this.flowers.bunch6.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch6[this.currentTurn])
          .setPosition(this.flowers.bunch6.x + 70, this.flowers.bunch6.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch6.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch6"].on("dragend", () => {
        const flower6Bounds = this.flowers.bunch6.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower6Bounds,vaseBounds)) {
            this.add.image(1185, 555, "violet")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch6.x = x6;
            this.flowers.bunch6.y = y6;


            this.add.text(520, 950, this.flowerTexts.bunch6[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch6, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x7, y: y7 } = this.flowers.bunch7
      this.input.setDraggable(this.flowers["bunch7"])

      this.flowers.bunch7.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch7[this.currentTurn])
          .setPosition(this.flowers.bunch7.x + 70, this.flowers.bunch7.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch7.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch7"].on("dragend", () => {
        const flower7Bounds = this.flowers.bunch7.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower7Bounds,vaseBounds)) {
            this.add.image(1190, 560, "daisy")
              .setScale(0.9)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch7.x = x7;
            this.flowers.bunch7.y = y7;


            this.add.text(520, 950, this.flowerTexts.bunch7[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch7,  
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )

      const { x: x8, y: y8 } = this.flowers.bunch8
      this.input.setDraggable(this.flowers["bunch8"])

      this.flowers.bunch8.on("pointerover", () => {
        this.textBubble.setText(this.flowerTexts.bunch8[this.currentTurn])
          .setPosition(this.flowers.bunch8.x + 70, this.flowers.bunch8.y - 30)
          .setDepth(this.flowers.bunch1.depth + 1)
          .setVisible(true);
      });

      this.flowers.bunch8.on("pointerout", () => {
        this.textBubble.setVisible(false);
      });

      this.flowers["bunch8"].on("dragend", () => {
        const flower8Bounds = this.flowers.bunch8.getBounds()
        const vaseBounds = this.vase.getBounds()
  
        if (flowersPlaced === 4 && Phaser.Geom.Intersects.RectangleToRectangle(flower8Bounds,vaseBounds)) {
            this.add.image(1185, 550, "daffodil")
              .setScale(0.8)
              .setInteractive()
              .setDepth(this.vase.depth - 1)

            this.selectSound.play()
            this.flowers.bunch8.x = x8;
            this.flowers.bunch8.y = y8;

            this.add.text(520, 950, this.flowerTexts.bunch8[this.currentTurn], { 
              fontSize: "32px", 
              fill: this.flowerColors.bunch8, 
              fontFamily: "PixelFont"
            })

            flowersPlaced++
            this.currentTurn++
            this.orderComplete()
          }
        }
      )
    }

    removeLastFlower() {
      if (this.flowersInVase.length > 0) {
        const lastFlower = this.flowersInVase.pop();
        lastFlower.destroy();
        console.log("Removed last flower from vase");
      } else {
        console.log("No flowers to remove");
      }
    }

    orderComplete() {
      this.add.text(1080, 250, "Order Complete!", {
        fontSize: "40px", 
        fill: "#FFFFFF", 
        fontFamily: "PixelFont"
      })
      this.alertSound.play()

      this.add.text(1295, 40, "0", {
        fontSize: "32px",
        fill: "#ffffff",
        fontFamily: "PixelFont",
      }).setDepth(2);

      this.nextLevel = this.add.image(1380, 460, "next-level").setScale(0.25).setDepth(2).setInteractive()
      this.add.text(1300, 400, "Next Order", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "PixelFont",
      }).setDepth(2);

      let glow
      this.nextLevel.on("pointerover", () => {
        glow = this.nextLevel.preFX.addGlow("0xffffff", 1, 0, false)
        this.hoverSound.play()
        this.nextLevel.setScale(0.27)
      })
      this.nextLevel.on("pointerout", () => {
        glow?.setActive(false)
        this.nextLevel.setScale(0.25)
      })
      this.nextLevel.on("pointerdown", () => {
        this.selectSound.play()
        const currentIndex = this.randomizedLevels.findIndex(level => level.key === this.scene.key);

        if (currentIndex >= 0 && currentIndex < this.randomizedLevels.length - 1) {
          const nextLevelKey = this.randomizedLevels[currentIndex + 1].key;
          this.scene.start(nextLevelKey);
        } else {
          this.scene.start('MainMenu');
        }
      })

    } 

}
