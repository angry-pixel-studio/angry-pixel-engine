declare type constructor = () => unknown;
export declare class Container {
    private instances;
    private constructors;
    add(name: string, constructor: constructor): void;
    getSingleton<T>(name: string): T;
    getTranscient<T>(name: string): T;
}
export {};
