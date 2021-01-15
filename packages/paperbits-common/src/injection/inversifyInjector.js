"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InversifyInjector = void 0;
require("reflect-metadata");
const injection_1 = require("../injection");
const inversify_1 = require("inversify");
class InversifyInjector {
    constructor() {
        this.bindSingleton = this.bindSingleton.bind(this);
        this.bind = this.bind.bind(this);
        this.container = new inversify_1.Container();
    }
    getFunctionArguments(func) {
        if (!func) {
            throw new Error(`Parameter "func" cannot be empty`);
        }
        if (typeof func !== "function") {
            throw new Error(`Parameter "func" is not a function.`);
        }
        const signature = func.toString();
        const classMatches = signature.match(/(constructor\s*\(([^\(\)]*)\))/);
        if (classMatches && classMatches.length >= 1) {
            const args = classMatches[2];
            return args.split(",").map((arg) => arg.replace(/\/\*.*\*\//, "").trim()).filter((arg) => arg);
        }
        const functionMatches = signature.match(/^function.*?\(([^\(\)]*)\)/);
        if (functionMatches && functionMatches.length >= 1) {
            const args = functionMatches[1];
            return args.split(",").map((arg) => arg.replace(/\/\*.*\*\//, "").trim()).filter((arg) => arg);
        }
        return [];
    }
    decorateComponent(name, component) {
        if (Reflect.hasOwnMetadata(inversify_1.METADATA_KEY.PARAM_TYPES, component)) {
            return;
        }
        try {
            inversify_1.decorate(inversify_1.injectable(), component);
            Reflect.defineMetadata(injection_1.InjectableMetadataKey, { name: name }, component);
        }
        catch (error) {
            console.warn(`Unable to decorate component "${name}". ${error.stack || error.message}`);
        }
        const constructorArguments = this.getFunctionArguments(component);
        for (let i = 0; i < constructorArguments.length; i++) {
            try {
                inversify_1.decorate(inversify_1.inject(constructorArguments[i]), component, i);
            }
            catch (error) {
                console.warn(`Unable to decorate constructor argument "${constructorArguments[i]}" for component "${name}". ${error.stack || error.message}`);
            }
        }
    }
    bindInternal(name, component) {
        if (this.container.isBound(name)) {
            this.container.unbind(name);
        }
        this.decorateComponent(name, component);
        return this.container.bind(name).to(component);
    }
    bind(name, component) {
        this.bindInternal(name, component);
    }
    bindSingleton(name, singletone) {
        this.bindInternal(name, singletone).inSingletonScope();
    }
    bindFactory(name, factory) {
        let injector = this;
        const construct = function () {
            return factory(injector);
        };
        this.bindInternal(name, construct);
    }
    bindSingletonFactory(name, factory) {
        const injector = this;
        const construct = function () {
            return factory(injector);
        };
        this.bindInternal(name, construct).inSingletonScope();
    }
    bindInstance(name, instance) {
        if (this.container.isBound(name)) {
            this.container.unbind(name);
        }
        this.container.bind(name).toConstantValue(instance);
    }
    resolve(runtimeIdentifier) {
        const component = this.container.get(runtimeIdentifier);
        if (!component) {
            throw new Error(`Component ${runtimeIdentifier} not found.`);
        }
        return component;
    }
    resolveClass(constructorFunc) {
        return this.container.resolve(constructorFunc);
    }
    bindModule(module) {
        module.register(this);
    }
    bindCollection(collectionName) {
        const kernel = this.container;
        const result = [];
        let Placeholder = class Placeholder {
        };
        Placeholder = __decorate([
            inversify_1.injectable()
        ], Placeholder);
        let Collection = class Collection {
            constructor() {
                try {
                    const collection = kernel.getAll(collectionName + "C");
                    result.push(...collection.slice(1));
                }
                catch (error) {
                    throw new Error(`Unable to resolve collection "${collectionName}": ${error.stack || error.message}`);
                }
                return result;
            }
        };
        Collection = __decorate([
            inversify_1.injectable(),
            __metadata("design:paramtypes", [])
        ], Collection);
        this.container.bind(collectionName).to(Collection).inSingletonScope();
        this.container.bind(collectionName + "C").to(Placeholder);
    }
    bindCollectionLazily(collectionName) {
        const kernel = this.container;
        const result = [];
        let Placeholder = class Placeholder {
        };
        Placeholder = __decorate([
            inversify_1.injectable()
        ], Placeholder);
        let Collection = class Collection {
            constructor() {
                setImmediate(() => {
                    try {
                        const collection = kernel.getAll(collectionName + "C");
                        result.push(...collection.slice(1));
                    }
                    catch (error) {
                        throw new Error(`Unable to resolve collection "${collectionName}": ${error.stack || error.message}`);
                    }
                });
                return result;
            }
        };
        Collection = __decorate([
            inversify_1.injectable(),
            __metadata("design:paramtypes", [])
        ], Collection);
        this.container.bind(collectionName).to(Collection).inSingletonScope();
        this.container.bind(collectionName + "C").to(Placeholder);
    }
    bindToCollection(collectionName, component, name) {
        this.decorateComponent(collectionName + "C", component);
        this.container.bind(collectionName + "C").to(component);
        if (name) {
            this.container.bind(name).to(component);
        }
    }
    bindInstanceToCollection(collectionName, instance, name) {
        this.container.bind(collectionName + "C").toConstantValue(instance);
        if (name) {
            this.container.bind(name).toConstantValue(instance);
        }
    }
}
exports.InversifyInjector = InversifyInjector;
//# sourceMappingURL=inversifyInjector.js.map