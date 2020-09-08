import Game from './Engine/Game';
import Race from './Race/Scenes/Race';
import Sandbox from './Demo/Scenes/Sandbox';

// Create the Game
const game = new Game('app', 1366, 768);

// Add Sencenes
//game.addScene('Race', () => new Race());
game.addScene('Sandbox', () => new Sandbox());

// Run the game
game.run();

//setTimeout(() => game.sceneManager.loadScene('Sandbox'), 3000);
