import { physicsManagerFactory, Rectangle, IPhysicsManager, Line, CollisionMethods, BroadPhaseMethods } from "..";
import { Vector2 } from "@angry-pixel/math";

const physicsManager: IPhysicsManager = physicsManagerFactory({
    collisionMethod: CollisionMethods.SAT,
    collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
});

const box1 = physicsManager.addCollider({
    layer: "default",
    position: new Vector2(20, 20),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});
const box2 = physicsManager.addCollider({
    layer: "default",
    position: new Vector2(40, 20),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

physicsManager.addCollider({
    layer: "default",
    position: new Vector2(500, 20),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

physicsManager.addCollider({
    layer: "default",
    position: new Vector2(540, 100),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

physicsManager.addCollider({
    layer: "default",
    position: new Vector2(1000, 1000),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

physicsManager.addCollider({
    layer: "default",
    position: new Vector2(20, 20),
    shape: new Line([new Vector2(0, 0), new Vector2(50, 20)]),
    updateCollisions: true,
    physics: true,
});

const run = () => {
    const then = Date.now();

    physicsManager.resolve(0);

    console.log(
        physicsManager
            .getCollisionsForCollider(box1)
            .map((c) => ({ local: c.localCollider.id, remote: c.remoteCollider.id, resolution: c.resolution })),
    );
    console.log("------------------------");

    box1.position.set(578, 100);
    box2.position.x = 10;

    physicsManager.resolve(0);

    console.log(
        physicsManager
            .getCollisionsForCollider(box1)
            .map((c) => ({ local: c.localCollider.id, remote: c.remoteCollider.id, resolution: c.resolution })),
    );

    console.log(
        physicsManager
            .getCollisionsForCollider(box2)
            .map((c) => ({ local: c.localCollider.id, remote: c.remoteCollider.id, resolution: c.resolution })),
    );
    console.log("------------------------");

    console.log("elapsed time:", Date.now() - then);
};

run();
