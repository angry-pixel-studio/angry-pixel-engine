import Scene from "../../Engine/Scene";
import Circuit from "../GameObjects/Circuit";
import SpotPointer from "../GameObjects/SpotPointer";
import Vehicle, { TAG_PLAYER } from "../GameObjects/Vehicle";
import raceData from "../race-result.json";
import CIRCUITS from "../Config/Circuits";
import PlayerStats from "../GameObjects/PlayerStats";

const BASE_VELOCITY = 3;
const DELTA_VELOCITY = 0.1;

export default class Race extends Scene {
    raceData = null;
    currentLapData = {};
    player = 'Player';

    constructor() {
        super();

        this.raceData = raceData;

        const circuitSpots = CIRCUITS[raceData.circuitUuid].spots;
        const circuitImage = CIRCUITS[raceData.circuitUuid].image;

        this.addGameObject(() => new Circuit(circuitImage, circuitSpots))
            .addGameObject(() => new SpotPointer())
            .addGameObject(() => new PlayerStats(), 'PlayerStats');

        this.setupVehicles();
    }

    setupVehicles() {
        this.raceData.laps[0]
        .vehicleLaps
            .forEach(
                vehicle => {
                    this.addGameObject(() => new Vehicle(vehicle.username, vehicle.username === this.player));
                    this.currentLapData[vehicle.username] = {
                        lap: 0,
                        username: vehicle.username,
                        position: 1,
                        speed: 0
                    };
                }
            );
    }

    processLap(vehicle) {
        const currentLapData = this.currentLapData[vehicle.username];
        const lastPosition = currentLapData.position;
        const lastLap = currentLapData.lap;

        if (this.raceData.laps.length === currentLapData.lap) {
            if (vehicle.tag === TAG_PLAYER) {
                this.getGameObject('PlayerStats').updateStats(currentLapData.lap, currentLapData.lap, lastPosition);
            }

            vehicle.stopVehicle();
            return;
        }

        const nextPosition = this.raceData
            .laps.reduce(
                (prev, lap) => prev = lap.lapNumber === currentLapData.lap  + 1 ? lap : prev
            ).vehicleLaps.reduce(
                (prev, vehicleLap) => prev = vehicleLap.username === vehicle.username ? vehicleLap.position : prev,
                0
            );

        vehicle.speed = BASE_VELOCITY + (currentLapData.position - nextPosition) * DELTA_VELOCITY;

        this.currentLapData[vehicle.username].speed = vehicle.speed;
        this.currentLapData[vehicle.username].lap += 1;
        this.currentLapData[vehicle.username].position = nextPosition;
        
        if (vehicle.tag === TAG_PLAYER) {
            this.getGameObject('PlayerStats').updateStats(currentLapData.lap, lastLap, lastPosition);
        }

        console.log(this.currentLapData[vehicle.username]);
    }
}