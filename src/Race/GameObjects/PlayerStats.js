import GameObject from "../../Engine/GameObject";
import TextRenderer from "../../Engine/Components/TextRenderer";

const LAP_TEXT = 'Current Lap: {lap}'
const STATS_TEXT = 'Last Lap: {lap} ~ Position: {position}';

export default class PlayerStats extends GameObject {
    constructor() {
        super();

        this.transform.position.x = -430;
        this.transform.position.y = -200;

        this.addComponent(() => new TextRenderer(this, {
            size: 25,
            color: '#E3DFDF',
            font: 'Courier New',
            lineSeparation: 10,
            bold: true
        }));    
    }

    updateStats(currentLap, lastLap, lastLapPosition) {
        let text = [
            LAP_TEXT.replace('{lap}', currentLap)
        ]

        if (lastLap && lastLapPosition) {
            text.push(STATS_TEXT
                .replace('{lap}', lastLap)
                .replace('{position}', lastLapPosition)
            );
        }

        this.getComponent(TextRenderer.name).text = text;
    }
}