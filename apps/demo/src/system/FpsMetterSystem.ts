import { GameSystem, TextRenderer, gamePhysicsSystem } from "angry-pixel";
import { FpsMetter } from "@component/FpsMetter";

const refreshTime = 0.1;

@gamePhysicsSystem()
export class FpsMetterSystem extends GameSystem {
    public onUpdate(): void {
        this.entityManager.search(FpsMetter).forEach(({ entity, component }) => {
            const textRenderer = this.entityManager.getComponent(entity, TextRenderer);

            component.gameLogicTimer += this.timeManager.unscaledDeltaTime;
            component.gameLogicCounter++;

            if (component.gameLogicTimer >= refreshTime) {
                component.gameLogicFps = (1 / (component.gameLogicTimer / component.gameLogicCounter)).toFixed(2);
                component.gameLogicTimer = 0;
                component.gameLogicCounter = 0;
            }

            component.physicsTimer += this.timeManager.unscaledPhysicsDeltaTime;
            component.physicsCounter++;

            if (component.physicsTimer >= refreshTime) {
                component.physicsFps = (1 / (component.physicsTimer / component.physicsCounter)).toFixed(2);
                component.physicsTimer = 0;
                component.physicsCounter = 0;
            }

            component.renderTimer += this.timeManager.browserDeltaTime;
            component.renderCounter++;

            if (component.renderTimer >= refreshTime) {
                component.renderFps = (1 / (component.renderTimer / component.renderCounter)).toFixed(2);
                component.renderTimer = 0;
                component.renderCounter = 0;
            }

            textRenderer.text = component.template
                .replace("%{g}", component.gameLogicFps)
                .replace("%{p}", component.physicsFps)
                .replace("%{r}", component.renderFps);
        });
    }
}
