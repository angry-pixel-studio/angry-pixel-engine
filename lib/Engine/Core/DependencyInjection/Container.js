"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var Container = /** @class */ (function () {
    function Container() {
        this.instances = new Map();
        this.constructors = new Map();
    }
    Container.prototype.add = function (name, constructor) {
        if (this.constructors.has(name)) {
            throw new Error("There is already an object constructor with the name " + name);
        }
        this.constructors.set(name, constructor);
    };
    Container.prototype.getSingleton = function (name) {
        if (this.constructors.has(name) === false) {
            throw new Error("Invalid object constructor name: " + name);
        }
        if (this.instances.has(name) === false) {
            this.instances.set(name, this.constructors.get(name)());
        }
        return this.instances.get(name);
    };
    Container.prototype.getTranscient = function (name) {
        if (this.constructors.has(name) === false) {
            throw new Error("Invalid object constructor name: " + name);
        }
        return this.constructors.get(name)();
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map