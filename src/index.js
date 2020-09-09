import Game from './Engine/Game';
import Sandbox from './Demo/Scenes/Sandbox';
import Race, { FINISHED_EVENT } from './Race/Scenes/Race';
import raceData1 from "./Race/Test/race-result.json";
import raceData2 from "./Race/Test/race-result-2.json";

const username = 'mauro';
const containerElement = document.getElementById('app');

// Create the Game
//const game = new Game(containerElement, 900, 502);
const game = new Game(containerElement, 1366, 768);

// Add a scene
//game.addScene('Race', () => new Race(username, raceData2));
game.addScene('Race', () => new Sandbox());

// Run the game
game.run();

// Stop the game
/*window.addEventListener(FINISHED_EVENT, () => {
    console.log('carrera finalziada');
    
    setTimeout(() => game.stop(), 3000);
});*/
