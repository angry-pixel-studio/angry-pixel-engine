import { AudioPlayer, GameSystem } from "angry-pixel-ecs";
import { NinjaMovement } from "../../component/ninja/NinjaMovement";
import { NinjaSfx } from "../../component/ninja/NinjaSfx";
import { ASSETS } from "../../config/assets";

const sfxVolume = 0.5;

export class NinjaSfxSystem extends GameSystem {
    public onUpdate(): void {
        const { entity, component: ninjaSfx } = this.entityManager.search(NinjaSfx)[0];
        const ninjaMovement = this.entityManager.getComponent(entity, NinjaMovement);
        const audioPlayer = this.entityManager.getComponent(entity, AudioPlayer);

        audioPlayer.volume = sfxVolume;

        if (ninjaMovement.walking) {
            ninjaSfx.stepTimer += this.timeManager.deltaTime;

            if (ninjaSfx.stepTimer >= ninjaSfx.stepCooldown) {
                ninjaSfx.stepTimer = 0;
                audioPlayer.audioSource = this.assetManager.getAudio(ASSETS.audio.sfxStep);
                audioPlayer.action = "play";
            }
        } else {
            ninjaSfx.stepTimer = ninjaSfx.stepCooldown;
        }

        if (ninjaMovement.grounded && ninjaMovement.jumping) {
            audioPlayer.audioSource = this.assetManager.getAudio(ASSETS.audio.sfxJump);
            audioPlayer.action = "play";
        }
    }
}
