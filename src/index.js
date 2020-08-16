import Game from './Engine/Game';
import Sandbox from './Demo/Scenes/Sandbox';

// Create the Game
let game = new Game('app', 800, 400);

// Add Sencenes
game.addScene('Sandbox', (sceneId, game) => new Sandbox(sceneId, game));

// Run the game
game.run();
