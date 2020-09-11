(function () {
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
})();

import Game from './Engine/Game';
import TopDown from './Demo/Scenes/TopDown';
import Platformer from './Demo/Scenes/Platformer';

const containerElement = document.getElementById('app');

// Create the Game
const game = new Game(containerElement, 1366, 768);

// Add a scene
game.addScene('TopDown', () => new TopDown(), true);
game.addScene('Platformer', () => new Platformer());

// Run the game
game.run();
