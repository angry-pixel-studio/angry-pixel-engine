# Managers

## Overview

In the engine, **Managers** are singleton classes that encapsulate core functionalities and provide global services accessible from anywhere in the game.  
Each manager is responsible for a clearly defined area and maintains persistent state while the application is running.

## Available Managers

| Manager           | Brief Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| **EntityManager** | Manages entities and components. Handles creation, destruction, and queries.        |
| **AssetManager**  | Loads and manages assets (images, audio, video, fonts, JSON).                       |
| **SceneManager**  | Controls scenes: registration, loading, lifecycle, cleanup of entities and systems. |
| **TimeManager**   | Manages time: delta time, time scaling, and custom intervals.                       |
| **InputManager**  | Unified user input: keyboard, mouse, touch screen, and gamepads.                    |
