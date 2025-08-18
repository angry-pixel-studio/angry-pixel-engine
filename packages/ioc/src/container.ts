/**
 * This type represents a dependency class
 * @public
 * @category Dependency Injection
 */
export type DependencyType = { new (...args: any[]): any };
/**
 * This type represents a dependency name
 * @public
 * @category Dependency Injection
 */
export type DependencyName = string | symbol;

/**
 * This type represents a property key of a decorator target
 * @public
 * @category Dependency Injection
 */
export type PropertyKey = string | symbol;

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
 * Decorator to mark a class as an injectable dependency that can be managed by the IoC container.\
 * Injectable classes can be automatically instantiated and have their dependencies resolved when requested through the container.\
 * This enables dependency injection and inversion of control.
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
 * Decorator to mark a property or constructor parameter as a dependency that should be automatically injected by the IoC container.\
 * When applied to a property or constructor parameter, the container will resolve and inject the specified dependency at runtime.
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
