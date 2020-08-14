import Component from "../Component";

export default class Transform extends Component {
    position = { x: 0, y: 0 }

    constructor(gameObject, config) {
        super(gameObject);
        this.position = config.position;
    }
}