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
            { x: -106, y: -118 },
            { x: -580, y: -93 },
            { x: -620, y: -74 },
            { x: -572, y: -59 },
            { x: -155, y: -63 },
            { x: -93, y: -44 },
            { x: -139, y: -22 },
            { x: -402, y: -15 },
            { x: -452, y: 10 },
            { x: -306, y: 83 },
            { x: -244, y: 84 },
            { x: -23, y: 14 },
            { x: 70, y: 29 },
            { x: 100, y: 66 },
            { x: 103, y: 106 },
            { x: 186, y: 131 },
            { x: 384, y: 127 },
            { x: 445, y: 107 },
            { x: 309, y: -79 },
            { x: 209, y: -125 },
            { x: 137, y: -133 }
        ];

        this.addGameObject(() => new Circuit('image/sun-peak.png', spots))
            .addGameObject(() => new SpotPointer());

        this.setupVehicles();
        //this.startRace();

        const camera = this.getGameObject(GameCamera.name);
        camera.addComponent(() => new FollowPlayerCamera(camera));
        //camera.addComponent(() => new MovingCamera(camera));
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