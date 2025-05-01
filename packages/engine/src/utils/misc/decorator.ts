/**
 * Applies a decorator manually to a target (class, property, or constructor parameter).\
 * This utility function simplifies the process of programmatically applying decorators without using the @ syntax.\
 * This is primarily useful in JavaScript where decorator syntax is not yet standardized.
 * @param decorator The decorator function to be applied.
 * @param target The target to which the decorator is applied (class, prototype, or constructor argument).
 * @param propertyKey The property name or constructor argument index (optional).
 * @public
 * @category Decorators
 * @example
 * ```javascript
 * decorate(injectable("SomeDependency"), SomeDependency);
 * ```
 * @example
 * ```javascript
 * decorate(inject("AnotherDependency"), SomeClass, "anotherDependency");
 * ```
 * @example
 * ```javascript
 *  decorate(inject("AnotherDependency"), SomeClass, 0);
 * ```
 * @example
 * ```javascript
 * decorate(gamePhysicsSystem(), SomeSystem);
 * ```
 * @example
 * ```javascript
 * decorate(gamePreRenderSystem(), SomeSystem);
 * ```
 */
export function decorate(decorator: (...args: any[]) => any, target: any, propertyKey?: string | symbol | number) {
    if (typeof propertyKey === "number") {
        // If propertyKey is a number, it's a constructor parameter.
        // Call the decorator with the target's prototype, no property key, and the parameter index.
        decorator(target.prototype, undefined, propertyKey);
    } else if (propertyKey !== undefined) {
        // If propertyKey is defined but not a number, it's a class property.
        // Call the decorator with the target's prototype and the property key.
        decorator(target.prototype, propertyKey);
    } else {
        // If propertyKey is undefined, it's a class-level decorator.
        // Call the decorator directly with the target.
        decorator(target);
    }
}
