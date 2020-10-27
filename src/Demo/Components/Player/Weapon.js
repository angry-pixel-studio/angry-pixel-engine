import Component from "../../../Engine/Component";
import { container } from "../../../Engine/Game";
import Projectile from "../../GameObjects/Projectile";

export default class Weapon extends Component {
    assetManager = container.getSingleton("AssetManager");
    inputManager = null;
    audioPlayer = null;

    firePressed = false;
    projectileAmount = 30;
    projectiles = [];

    start() {
        this.inputManager = this.findGameObjectByName("InputManager");
        this.audioPlayer = this.getComponent("AudioPlayer");

        this.setupProjectiles();
    }

    setupProjectiles() {
        for (let i = 0; i < this.projectileAmount; i++) {
            const name = `Projectile${i}`;
            this.gameObject.addChild(() => new Projectile(this), name);
            this.gameObject.getChild(name).setActive(false);
            this.projectiles.push(this.gameObject.getChild(name));
        }
    }

    update() {
        this.fire();
    }

    fire() {
        if (this.projectiles.length > 0 && this.inputManager.fire && this.firePressed === false) {
            const p = this.projectiles.pop();
            p.setActive(true);
            p.fire(this.getComponent("Movements").angle);

            this.audioPlayer.playAudio(this.assetManager.getAudio("audio/gunshot.wav"), 0.2);
        }

        this.firePressed = this.inputManager.fire;
    }

    restoreProjectile(projectile) {
        projectile.setActive(false);
        this.projectiles.push(projectile);
    }
}
