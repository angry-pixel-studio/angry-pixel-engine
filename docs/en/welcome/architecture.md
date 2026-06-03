# Architecture

Angry Pixel Engine is built around the **Entity-Component-System (ECS)** pattern.

## What is ECS

ECS is an architectural pattern that separates data from logic through three concepts:

- **Entities** are identifiers that represent game objects.
- **Components** are data attached to entities. They hold state but no logic.
- **Systems** are the logic that operates on entities through their components.

Behavior comes from the combination of components on an entity and the systems that act on them, rather than from inheritance.

## Hierarchy

The engine is organized in the following hierarchy:

```
Game
└── Scene
    ├── Systems
    └── Entities
        └── Components
```

### Game

The `Game` class is the entry point. A game is a single `Game` instance, created from a configuration object (container element, resolution, physics and collision settings, and similar options).

It holds the scenes and dependencies, and controls the game loop through its `start` and `stop` methods.

### Scene

A `Scene` is a self-contained part of the game, such as a level, a menu, or a loading screen. A game can register one or more scenes, and one scene is active at a time.

Each scene defines the systems it runs, the assets it loads, and the entities it creates when it becomes active.

### Entity

An entity is a unique identifier. By itself it holds no data and no logic; it gains state and behavior from the components attached to it.

### Component

A component is a data container attached to an entity. Components store state and contain no logic. An entity's set of components defines what it is.

### System

A system contains logic. It queries the entities that have a given set of components and operates on them. A system runs its logic every frame and can react to lifecycle events such as creation, destruction, enabling, and disabling.

## Game loop

The engine runs its update cycle in three phases:

- **Game logic**: gameplay systems such as input, audio, animation, and custom logic.
- **Physics**: collision detection and physics resolution. The `Transform` component is updated in this phase.
- **Rendering**: rendering and camera systems.

Custom systems run in the game logic phase by default and can be assigned to the physics or pre-render phases.
