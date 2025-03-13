import { Scene } from 'phaser';

export class Level1 extends Scene
{
  constructor () {
    super('Level1');
    this.textBubble = null;
    this.currentTurn = 0;
    this.currentFlower = 0;
  }

  preload () {
    this.load.image('shop-bg', 'assets/main-bg-4.png')
    this.load.image('frame', 'assets/order-frame.png')
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
    this.load.image('vase', 'assets/vase-3.png')
  }
    
  create ()
    {
      this.hoverSound = this.sound.add("hover")
      this.selectSound = this.sound.add("select")

      const bg = this.add.image(0, 0, "shop-bg")
      bg.setOrigin(0, 0)
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

      this.vase = this.add.image(1210, 550, 'vase')
      this.vase.setScale(0.5)
      this.vase.setDepth(1);
      this.vase.preFX.addShadow()

      this.setFlowers()
      //this.createStoryPanel()

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
          "It sounds like you're going through a tough time.",
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
          "Rose message 1",
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
          "Violet message 1",
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

    createStoryPanel() {
      // Wooden frame
      this.storyFrame = this.add.image(600, 300, "frame").setDepth(10).setScale(1.2);
    
      // Story text
      this.storyText = this.add.text(450, 250, "Once upon a time...", {
        fontSize: "24px",
        fill: "#000",
        wordWrap: { width: 300 },
        fontFamily: "PixelFont",
      }).setDepth(11);
    
      // Close button
      this.closeButton = this.add.text(700, 100, "X", {
        fontSize: "32px",
        fill: "#ff0000",
        fontFamily: "PixelFont",
      }).setDepth(12).setInteractive();
    
      // Story tab (hidden initially)
      this.storyTab = this.add.text(50, 550, "Story", {
        fontSize: "24px",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
        fontFamily: "PixelFont",
      }).setDepth(9).setInteractive().setVisible(false);
    
      // Close button minimizes the panel
      this.closeButton.on("pointerdown", () => {
        this.storyFrame.setVisible(false);
        this.storyText.setVisible(false);
        this.closeButton.setVisible(false);
        this.storyTab.setVisible(true);
      });
    
      // Clicking the tab restores the story
      this.storyTab.on("pointerdown", () => {
        this.storyFrame.setVisible(true);
        this.storyText.setVisible(true);
        this.closeButton.setVisible(true);
        this.storyTab.setVisible(false);
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

    orderComplete() {
      this.add.text(1100, 100, "Order Complete!", {
        fontSize: "32px", 
        fill: "#0165FC", 
        fontFamily: "PixelFont"
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
