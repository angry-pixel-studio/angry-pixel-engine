import { GameSystem, playSfx } from "angry-pixel";
import { NinjaMovement } from "@component/ninja/NinjaMovement";
import { NinjaSfx } from "@component/ninja/NinjaSfx";
import { ASSETS } from "@config/assets";

const sfxVolume = 0.5;

export class NinjaSfxSystem extends GameSystem {
    public onUpdate(): void {
        this.entityManager.search(NinjaSfx).forEach(({ entity, component: ninjaSfx }) => {
            const ninjaMovement = this.entityManager.getComponent(entity, NinjaMovement);
            if (ninjaMovement.walking) {
                if (!ninjaSfx.intervalId) {
                    ninjaSfx.intervalId = this.timeManager.setInterval({
                        callback: () =>
                            playSfx({
                                audioSource: this.assetManager.getAudio(ASSETS.audio.sfxStep),
                                volume: sfxVolume,
                            }),
                        delay: ninjaSfx.stepCooldown,
                        executeImmediately: true,
                    });
                }
            } else {
                if (ninjaSfx.intervalId) {
                    this.timeManager.clearInterval(ninjaSfx.intervalId);
                    ninjaSfx.intervalId = undefined;
                }
            }

            if (ninjaMovement.grounded && ninjaMovement.jumping) {
                playSfx({ audioSource: this.assetManager.getAudio(ASSETS.audio.sfxJump), volume: sfxVolume * 0.4 });
            }
        });
    }
}
