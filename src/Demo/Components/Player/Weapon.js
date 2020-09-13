import Component from "../../../Engine/Component";
import Projectile from "../../GameObjects/Projectile";

export default class Weapon extends Component {
    mouse = null;
    mousePressed = false;
    projectileAmount = 20;
    projectiles = [];

    start(event) {
        this.mouse = event.input.mouse;
        this.setupProjectiles();
    }

    setupProjectiles() {
        for(let i = 0; i < this.projectileAmount; i++) {
            const id = `Projectile${i}`;
            this.gameObject.addChild(() => new Projectile(this), id);
            this.gameObject.setChildActive(id, false);
            this.projectiles.push(this.gameObject.getChild(id));
        }
    }

    update() {
        this.fire();
    }

    fire() {
        if (this.projectiles.length > 0 && this.mouse.leftButtonPressed && this.mousePressed === false) {
            const p = this.projectiles.pop();
            this.gameObject.setChildActive(p.id, true);
            p.fire(this.getComponent('Movements').angle);
        }

        this.mousePressed = this.mouse.leftButtonPressed;
    }

    restoreProjectile(projectile) {
        this.gameObject.setChildActive(projectile.id, false);
        this.projectiles.push(projectile);
    }
}