import GameCamera from "../../Engine/GameObjects/GameCamera";
import Scene from "../../Engine/Scene/Scene";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";
import Circuit from "../GameObjects/Circuit";
import SpotPointer from "../GameObjects/SpotPointer";
import Vehicle from "../GameObjects/Vehicle";
import raceData from "../race-result.json";

const BASE_VELOCITY = 3;
const DELTA_VELOCITY = 0.1;

export default class Sandbox extends Scene {
    raceData = null;
    currentLapData = {};
    player = 'Player';

    constructor(id, game) {
        super(id, game);

        this.raceData = raceData;

        const spots = [
            {x: -38, y: -157},
            {x: -341, y: -128},
            {x: -382, y: -103},
            {x: -343, y: -78},
            {x: -85, y: -81},
            {x: -38, y: -52},
            {x: -74, y: -29},
            {x: -235, y: -22},
            {x: -271, y: 13},
            {x: -150, y: 114},
            {x: 19, y: 14},
            {x: 71, y: 42},
            {x: 89, y: 83},
            {x: 93, y: 135},
            {x: 147, y: 172},
            {x: 290, y: 164},
            {x: 316, y: 123},
            {x: 206, y: -134},
            {x: 118, y: -173}
        ];

        this.addGameObject(() => new Circuit('image/sunpeak.png', spots))
            .addGameObject(() => new SpotPointer());

        this.setupVehicles();
        //this.startRace();

        const camera = this.getGameObject(GameCamera.name);
        //camera.addComponent(() => new FollowPlayerCamera(camera));
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
        
        if (this.raceData.laps.length === currentLapData.lap) {
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

        console.log(this.currentLapData[vehicle.username]);
    }
}