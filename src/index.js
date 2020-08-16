import Game from './Engine/Game';
import Sandbox from './Demo/Scenes/Sandbox';
import CryptoMotorsRace from './Demo/Scenes/CryptoMotorsRace';

// Create the Game
let game = new Game('app', 800, 400);

// Add Sencenes
//game.addScene('Sandbox', (sceneId, game) => new Sandbox(sceneId, game));
game.addScene('CryptoMotorsRace', (sceneId, game) => new CryptoMotorsRace(sceneId, game));

// Run the game
game.run();
