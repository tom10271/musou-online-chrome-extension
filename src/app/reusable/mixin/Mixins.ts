// This function support methods mixin only, you still need to copy essential attributes to derived class

export function applyMixins(derivedClass: any, baseClasses: any[], includeConstructor: boolean = false, skipMethods = []) {
    baseClasses.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            if ((includeConstructor || name !== 'constructor') && skipMethods.indexOf(name) === -1) {
                derivedClass.prototype[name] = baseClass.prototype[name];
            }
        });
    });
}