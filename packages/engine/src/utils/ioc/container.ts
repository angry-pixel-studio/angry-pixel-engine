/**
 * This type represents a dependency class
 * @public
 * @category Core
 */
export type DependencyType = { new (...args: any[]): any };
/**
 * This type represents a dependency name
 * @public
 * @category Core
 */
export type DependencyName = string | symbol;

type PropertyKey = string | symbol;

export class Container {
    private instances: Map<DependencyName, any> = new Map();
    private types: Map<DependencyName, DependencyType> = new Map();

    public add(type: DependencyType, name?: DependencyName): Container {
        if (!name && !type.prototype.__ioc_injectable) {
            throw new Error(`Type ${type.name} is not injectable`);
        }

        this.types.set(name ?? type.prototype.__ioc_injectable, type);

        return this;
    }

    public set(name: DependencyName, dependency: any): Container {
        this.instances.set(name, dependency);
        return this;
    }

    public get<T>(name: DependencyName): T {
        if (!this.instances.has(name)) {
            const type = this.types.get(name);
            if (!type) throw new Error(`${name.toString()} is not a valid type`);

            // constructor params
            const instance = new type(
                ...(type.prototype.__ioc_inject_constructor ?? []).map((inject: DependencyName) => this.get(inject)),
            );

            // class props
            (type.prototype.__ioc_inject_prop ?? []).forEach(
                ([prop, dependency]: [PropertyKey, DependencyName]) => (instance[prop] = this.get(dependency)),
            );

            this.instances.set(name, instance);
        }

        return this.instances.get(name);
    }

    public has(name: DependencyName): boolean {
        return this.types.has(name) || this.instances.has(name);
    }
}

/**
 * Decorator to identify a class as an injectable dependency
 * @param name the name to identify the dependency
 * @public
 * @category Decorators
 * @example
 * ```typescript
 * @injectable("SomeDependency")
 * class SomeDependency {}
 * ```
 */
export function injectable(name: DependencyName) {
    return function (target: DependencyType) {
        if (!target.prototype.__ioc_injectable || target.prototype.__ioc_injectable !== name) {
            target.prototype.__ioc_injectable = name;
        }
    };
}

/**
 * Decorator to identify a property, or constructor argument, as a dependency to be injected
 * @param name the name to identify the dependency
 * @public
 * @category Decorators
 * @example
 * ```typescript
 * class SomeClass {
 *   private anotherDependency: DependencyType;
 *
 *   constructor(@inject("AnotherDependency") anotherDependency: DependencyType) {
 *     this.anotherDependency = anotherDependency;
 *   }
 * }
 * ```
 * @example
 * ```typescript
 * class SomeClass {
 *   @inject("AnotherDependency") private anotherDependency: DependencyType;
 * }
 * ```
 */
export function inject(name: DependencyName) {
    return function (target: any, propertyKey?: PropertyKey, parameterIndex?: number) {
        if (parameterIndex !== undefined) {
            // constructor param
            if (!target.prototype.__ioc_inject_constructor) target.prototype.__ioc_inject_constructor = [];
            target.prototype.__ioc_inject_constructor[parameterIndex] = name;
        } else if (propertyKey !== undefined) {
            // class prop
            if (!target.constructor.prototype.__ioc_inject_prop) target.constructor.prototype.__ioc_inject_prop = [];
            target.constructor.prototype.__ioc_inject_prop.push([propertyKey, name]);
        }
    };
}
