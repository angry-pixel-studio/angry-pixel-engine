import Component, { CAMERA } from "../../Engine/Component";

export default class MovingCamera extends Component {
    camera = null;
    
    constructor(gameObject) {
        super(gameObject);

        this.camera = gameObject.getComponent(CAMERA);
    }

    gameLoop(event)  {
        
    }
}