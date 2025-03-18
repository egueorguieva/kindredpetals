import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { Level4 } from './scenes/Level4';
import { Level3 } from './scenes/Level3';
import { Level2 } from './scenes/Level2';
import { Level1 } from './scenes/Level1';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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
        Level1,
        Level2,
        Level3,
        Level4,
        GameOver
    ]
};

export default new Phaser.Game(config);
