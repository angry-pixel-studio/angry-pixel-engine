import Game from './Engine/Game';
import Race from './Race/Scenes/Race';
import Sandbox from './Demo/Scenes/Sandbox';

// Create the Game
const game = new Game('app', 900, 502);

// Add Sencenes
game.addScene(Race.name, () => new Race());
//game.addScene(Sandbox.name, () => new Sandbox());

// Run the game
game.run();
