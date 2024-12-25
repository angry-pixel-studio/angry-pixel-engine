import { AudioPlayer, GameSystem } from "angry-pixel";
import { NinjaMovement } from "@component/ninja/NinjaMovement";
import { NinjaSfx } from "@component/ninja/NinjaSfx";
import { ASSETS } from "@config/assets";

const sfxVolume = 0.5;

export class NinjaSfxSystem extends GameSystem {
    public onUpdate(): void {
        const { entity, component: ninjaSfx } = this.entityManager.search(NinjaSfx)[0];
        const ninjaMovement = this.entityManager.getComponent(entity, NinjaMovement);
        const audioPlayer = this.entityManager.getComponent(entity, AudioPlayer);

        if (ninjaMovement.walking) {
            if (!ninjaSfx.intervalId) {
                ninjaSfx.intervalId = this.timeManager.setInterval({
                    callback: () => {
                        audioPlayer.volume = sfxVolume;
                        audioPlayer.audioSource = this.assetManager.getAudio(ASSETS.audio.sfxStep);
                        audioPlayer.action = "play";
                    },
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
            audioPlayer.audioSource = this.assetManager.getAudio(ASSETS.audio.sfxJump);
            audioPlayer.volume = sfxVolume * 0.4;
            audioPlayer.action = "play";
        }
    }
}
