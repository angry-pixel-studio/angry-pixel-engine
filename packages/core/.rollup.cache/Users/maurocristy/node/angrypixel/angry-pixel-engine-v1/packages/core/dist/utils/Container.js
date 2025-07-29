import { Exception } from "./Exception";
/** @internal */
export class Container {
    constructor() {
        this.instances = new Map();
        this.constructors = new Map();
        this.constants = new Map();
    }
    add(name, constructor) {
        if (this.constructors.has(name)) {
            throw new Exception(`There is already an object constructor with the name ${name}`);
        }
        this.constructors.set(name, constructor);
    }
    getSingleton(name) {
        if (this.constructors.has(name) === false) {
            throw new Exception(`Invalid object constructor name: ${name}`);
        }
        if (this.instances.has(name) === false) {
            this.instances.set(name, this.constructors.get(name)());
        }
        return this.instances.get(name);
    }
    getTranscient(name) {
        if (this.constructors.has(name) === false) {
            throw new Exception(`Invalid object constructor name: ${name}`);
        }
        return this.constructors.get(name)();
    }
    addConstant(name, value) {
        if (this.constants.has(name)) {
            throw new Exception(`There is already a constant value with the name ${name}`);
        }
        this.constants.set(name, value);
    }
    getConstant(name) {
        if (this.constants.has(name) === false) {
            throw new Exception(`Invalid constant name: ${name}`);
        }
        return this.constants.get(name);
    }
}
//# sourceMappingURL=Container.js.map