import { Exception } from "./Exception";

type constructor = () => unknown;

/** @internal */
export class Container {
    private instances: Map<string, unknown> = new Map<string, unknown>();
    private constructors: Map<string, constructor> = new Map<string, constructor>();
    private constants: Map<string, unknown> = new Map<string, unknown>();

    public add(name: string, constructor: constructor): void {
        if (this.constructors.has(name)) {
            throw new Exception(`There is already an object constructor with the name ${name}`);
        }

        this.constructors.set(name, constructor);
    }

    public getSingleton<T>(name: string): T {
        if (this.constructors.has(name) === false) {
            throw new Exception(`Invalid object constructor name: ${name}`);
        }

        if (this.instances.has(name) === false) {
            this.instances.set(name, this.constructors.get(name)());
        }

        return this.instances.get(name) as T;
    }

    public getTranscient<T>(name: string): T {
        if (this.constructors.has(name) === false) {
            throw new Exception(`Invalid object constructor name: ${name}`);
        }

        return this.constructors.get(name)() as T;
    }

    public addConstant(name: string, value: unknown): void {
        if (this.constants.has(name)) {
            throw new Exception(`There is already a constant value with the name ${name}`);
        }

        this.constants.set(name, value);
    }

    public getConstant<T>(name: string): T {
        if (this.constants.has(name) === false) {
            throw new Exception(`Invalid constant name: ${name}`);
        }

        return this.constants.get(name) as T;
    }
}
