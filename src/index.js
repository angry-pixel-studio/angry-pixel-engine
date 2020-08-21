import Game from './Engine/Game';
import Race from './Race/Scenes/Race';

// Create the Game
const game = new Game('app', 900, 502);

// Add Sencenes
game.addScene(Race.name, (sceneId, game) => new Race(sceneId, game));

// Run the game
game.run();
