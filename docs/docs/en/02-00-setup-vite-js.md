# Creating a JavaScript project with Vite

If you want to work with plain JavaScript:

### Step 1: Create the project using Vite

```bash
npm create vite@latest my-game -- --template vanilla
cd my-game
```

### Step 2: Install Angry Pixel Engine

```bash
npm install angry-pixel
```

### Step 3: Clean unnecessary files

Inside the `src` folder, delete all files except for `main.js` and `style.css`.

Also, delete the `counter.js` file if it exists.

### Step 4: Replace the contents of `style.css`

Open `src/style.css` and replace its content with:

```css
- {
    margin: 0;
    padding: 0;
}

body {
    background-color: black;
    overflow: hidden;
}

#app {
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    aspect-ratio: 16/9;
}

#app canvas {
    width: 100%;
    height: 100%;
    outline: none;
}
```

> **Note**: The `aspect-ratio` value is set to `16/9` because this example uses a resolution of **1920x1080**. You should adjust this value if you choose a different resolution for your game.

### Step 5: Edit `index.html`

Open `index.html` (at the root of the project) and make sure it contains the following element inside the `<body>`:

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

If the `div id="app"` does not exist, add it.

### Step 6: Edit `src/main.js`

Replace the contents of `src/main.js` with:

```javascript
import "./style.css";
import { Game } from "angry-pixel";

const game = new Game({
    containerNode: document.getElementById("app"),
    width: 1920,
    height: 1080,
});

game.start();
```

> **Note**: It's important to import the `style.css` file in `main.js` so that the styles are correctly applied.

### Step 7: Adding assets

All asset files (images, sounds, videos, etc.) should be placed inside the `public` folder, which Vite includes by default.

For example:

```plaintext
/public/sprites/player.png
```

You can access these files in your code with paths relative to `public`:

```javascript
const spritePath = "/sprites/player.png";
```

### Step 8: Run the project in development mode

```bash
npm run dev
```

Vite will open your game in the browser.  
Any changes you make will automatically update thanks to Hot Module Replacement (_HMR_).

### Step 9: Build the production bundle

When your game is ready for production:

```bash
npm run build
```

Vite will create a `dist/` folder with all the files ready for distribution.

> **Note**: If you want to share or publish your game on platforms like [itch.io](https://itch.io), [Game Jolt](https://gamejolt.com), and others, you should upload the **contents of the `dist` folder**.  
> Typically, you compress the entire `dist` folder into a `.zip` file for easier distribution.

---

**✅ Final typical project structure:**

```plaintext
my-game/
├── index.html
├── package.json
├── public/
│ └── (your assets, e.g., sprites, sounds, etc.)
├── src/
│ ├── main.js
│ └── style.css
├── node_modules/
├── vite.config.js (optional)
└── dist/ (generated after running npm run build)
```
