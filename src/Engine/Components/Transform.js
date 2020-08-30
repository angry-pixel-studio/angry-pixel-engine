import Component from "../Component";

export default class Transform extends Component {
    position = { x: 0, y: 0 }
    scale = {x: 1, y: 1}

    constructor(gameObject, config) {
        super(gameObject);

        //this.position = config.position !== undefined ? config.position : this.position;
        //this.scale = config.scale !== undefined ? config.scale : this.scale;
    }
}