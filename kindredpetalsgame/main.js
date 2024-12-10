import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#f3f3f3',
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Load assets here, e.g., images for shelves and items
}

function create() {
  // Add game objects and interactions
  this.add.text(10, 10, 'Start Message', { font: '16px Arial', fill: '#000' });
}

function update() {
  // Game logic updates
}
