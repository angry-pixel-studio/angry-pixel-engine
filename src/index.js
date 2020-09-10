import Game from './Engine/Game';
import Sandbox from './Demo/Scenes/Sandbox';

const containerElement = document.getElementById('app');

// Create the Game
const game = new Game(containerElement, 1366, 768);

// Add a scene
game.addScene('Sandbox', () => new Sandbox());

// Run the game
game.run();
