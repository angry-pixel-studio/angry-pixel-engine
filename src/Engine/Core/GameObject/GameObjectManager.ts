import GameObject from "../../GameObject";

class GameObjectManager {
    private gameObjects: GameObject[] = [];
    
    addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject)
    }

    findGameObjectByUuid(uuid: string): GameObject | null {
        return this.gameObjects.reduce(
            (prev, gameObject) => gameObject.id === uuid
                ? gameObject
                : prev
            , null
        );
    }
};