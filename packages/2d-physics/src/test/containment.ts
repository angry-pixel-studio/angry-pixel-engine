import { physicsManagerFactory, Rectangle, IPhysicsManager, CollisionMethods } from "..";
import { Vector2 } from "@angry-pixel/math";

const physicsManager: IPhysicsManager = physicsManagerFactory({ collisionMethod: CollisionMethods.SAT });

const box1 = physicsManager.addCollider({
    layer: "default",
    position: new Vector2(35, 60),
    shape: new Rectangle(20, 30),
    updateCollisions: true,
    physics: true,
});

physicsManager.addCollider({
    layer: "default",
    position: new Vector2(50, 60),
    shape: new Rectangle(60, 80),
    updateCollisions: true,
    physics: true,
});

const run = () => {
    // left
    box1.position.set(25, 60);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    box1.position.set(35, 60);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    // right
    box1.position.set(65, 60);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    box1.position.set(75, 60);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    // top
    box1.position.set(50, 90);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    box1.position.set(50, 80);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    // bottom
    box1.position.set(50, 40);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");

    box1.position.set(50, 30);
    physicsManager.resolve(0);
    console.log(box1.position, physicsManager.getCollisionsForCollider(box1).map((c) => c.resolution)[0]);
    console.log("\n");
};

run();
