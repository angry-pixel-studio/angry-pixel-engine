import Game from './Engine/Game';
import Race from './Race/Scenes/Race';
import Sandbox from './Demo/Scenes/Sandbox';
import raceData1 from "./Race/Test/race-result.json";
import raceData2 from "./Race/Test/race-result-2.json";

//const username = 'mauro';

// Create the Game
//const game = new Game('app', 900, 502);
const game = new Game('app', 1366, 768);

// Add Sencenes
//game.addScene('Race', () => new Race(username, raceData2));
game.addScene('Sandbox', () => new Sandbox());

// Run the game
game.run();

//setTimeout(() => game.sceneManager.loadScene('Sandbox'), 3000);
