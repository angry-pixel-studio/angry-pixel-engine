type constructor = () => unknown;

export default class Container {
    private instances: Map<string, unknown> = new Map<string, unknown>();
    private constructors: Map<string, constructor> = new Map<string, constructor>();

    public add(name: string, constructor: constructor): void {
        if (this.constructors.has(name)) {
            throw new Error(`There is already an object constructor with the name ${name}`);
        }

        this.constructors.set(name, constructor);
    }

    public getSingleton<T>(name: string): T {
        if (this.constructors.has(name) === false) {
            throw new Error(`Invalid object constructor name: ${name}`);
        }

        if (this.instances.has(name) === false) {
            this.instances.set(name, this.constructors.get(name)());
        }

        return this.instances.get(name) as T;
    }

    public getTranscient<T>(name: string): T {
        if (this.constructors.has(name) === false) {
            throw new Error(`Invalid object constructor name: ${name}`);
        }

        return this.constructors.get(name)() as T;
    }
}
