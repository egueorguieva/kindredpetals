import { Level4 } from './scenes/Level4';
import { Level3 } from './scenes/Level3';
import { Level2 } from './scenes/Level2';
import { Level1 } from './scenes/Level1';
import { Instructions } from './scenes/Instructions';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const levels = [
    { key: 'Level1', scene: Level1 },
    { key: 'Level2', scene: Level2 },
    { key: 'Level3', scene: Level3 },
    { key: 'Level4', scene: Level4 },
  ];  
const randomizedLevels = shuffleArray(levels);

console.log(randomizedLevels);

const config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 1080,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        MainMenu,
        ...randomizedLevels.map(l => l.scene),
        GameOver
    ]
};

const game = new Phaser.Game(config);
game.randomizedLevels = randomizedLevels; // Store it in the game instance

export default game;
