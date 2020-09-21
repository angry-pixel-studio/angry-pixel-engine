import GameObject from "../../GameObject";

interface GameObjectManager {
    gameObjects: GameObject[];
    addGameObject(gameObject: GameObject): void;
};

export const GameObjectManager: GameObjectManager = {
    gameObjects: [],
    
    addGameObject: function(gameObject: GameObject): void {
        this.gameObjects.push(gameObject)
    },

    
};