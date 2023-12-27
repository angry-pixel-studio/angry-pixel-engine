import { physicsManagerFactory, Rectangle, IPhysicsManager, Circumference, RigidBodyType, CollisionMethods } from "..";
import { Vector2 } from "@angry-pixel/math";

const physicsManager: IPhysicsManager = physicsManagerFactory({ collisionMethod: CollisionMethods.AABB });

const pos1 = new Vector2(0, 20);
const pos2 = new Vector2(60, 20);

physicsManager.addCollider({
    layer: "default",
    position: pos1.clone(),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

const box2 = physicsManager.addCollider({
    layer: "default",
    position: pos2.clone(),
    shape: new Rectangle(40, 40),
    updateCollisions: true,
    physics: true,
});

const ball1 = physicsManager.addCollider({
    layer: "default",
    position: pos1.clone(),
    shape: new Circumference(20),
    physics: true,
    updateCollisions: true,
});

const rb1 = physicsManager.addRigidBody({
    colliderIds: [ball1.id],
    gravity: 1,
    type: RigidBodyType.Dynamic,
    position: pos1.clone(),
    velocity: new Vector2(10, 0),
    onResolve: (rb) => console.log("ball", rb.position),
});

physicsManager.addRigidBody({
    colliderIds: [box2.id],
    gravity: 0,
    type: RigidBodyType.Dynamic,
    position: pos2.clone(),
    velocity: new Vector2(5, 0),
    onResolve: (rb) => console.log("box", rb.position),
});

const run = () => {
    for (let i = 0; i <= 20; i++) {
        physicsManager.resolve(i > 0 ? 1 : 0);

        if (physicsManager.getCollisionsForCollider(ball1).length === 0) {
            rb1.velocity.x = 10;
        }

        console.log("------------------------");
    }
};

run();
