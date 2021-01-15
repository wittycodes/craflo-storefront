"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnockoutRegistrationLoaders = void 0;
const ko = require("knockout");
const injection_1 = require("@paperbits/common/injection");
class KnockoutRegistrationLoaders {
    register(injector) {
        const injectableComponentLoader = {
            loadViewModel(name, config, callback) {
                const injectable = Reflect.getMetadata(injection_1.InjectableMetadataKey, config);
                if (!injectable) {
                    callback(null);
                    return;
                }
                const viewModelConstructor = function (params) {
                    const resolvedInjectable = injector.resolve(injectable.name);
                    let instance = resolvedInjectable;
                    if (resolvedInjectable.factory) {
                        instance = resolvedInjectable.factory(injector, params);
                    }
                    Object.getOwnPropertyNames(instance.constructor.prototype).forEach(prop => {
                        if (typeof instance[prop] === "function" && prop !== "constructor") {
                            instance[prop] = instance[prop].bind(instance);
                        }
                    });
                    const parameterDescriptions = Reflect.getMetadata("params", instance.constructor);
                    if (parameterDescriptions && params) {
                        if (typeof params === "string") {
                            try {
                                params = eval(`(${params})`);
                            }
                            catch (error) {
                            }
                        }
                        if (typeof params === "object") {
                            parameterDescriptions.forEach(parameterName => {
                                const instanceValue = instance[parameterName];
                                const paramerterValue = params[parameterName] || params[parameterName.toLowerCase()];
                                if (paramerterValue === undefined) {
                                    return;
                                }
                                if (ko.isObservable(instanceValue)) {
                                    if (ko.isObservable(paramerterValue)) {
                                        instanceValue(paramerterValue());
                                        paramerterValue.subscribe((value) => {
                                            instanceValue(value);
                                        });
                                    }
                                    else {
                                        instanceValue(paramerterValue);
                                    }
                                }
                                else {
                                    instance[parameterName] = ko.unwrap(paramerterValue);
                                }
                            });
                        }
                    }
                    const eventDescriptions = Reflect.getMetadata("events", instance.constructor);
                    if (eventDescriptions) {
                        eventDescriptions.forEach(methodReference => {
                            if (params && params[methodReference]) {
                                instance[methodReference] = params[methodReference];
                            }
                            else {
                                console.warn(`Event "${methodReference}" in the component "${name}" doesn't have listeners.`);
                            }
                        });
                    }
                    const onMountedMethodDescriptions = Reflect.getMetadata("onmounted", instance.constructor);
                    if (onMountedMethodDescriptions) {
                        onMountedMethodDescriptions.forEach(methodDescription => {
                            const methodReference = instance[methodDescription];
                            if (methodReference) {
                                methodReference();
                            }
                        });
                    }
                    return instance;
                };
                ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
            },
            loadTemplate(name, templateHtml, callback) {
                const parseHtmlFragment = ko.utils.parseHtmlFragment;
                const nodes = parseHtmlFragment(templateHtml, document);
                ko.components.defaultLoader.loadTemplate(name, nodes, callback);
            },
            loadComponent(componentName, config, callback) {
                const callbackWrapper = (resultWrapper) => {
                    const createViewModelWrapper = (params, options) => {
                        const attrs = options.element["attributes"];
                        if (attrs && attrs.length > 0) {
                            const runtimeParams = {};
                            for (const attr of Array.prototype.slice.call(attrs)) {
                                if (attr.name.startsWith("runtime-")) {
                                    const paramName = attr.name.split("-")[1];
                                    runtimeParams[paramName] = attr.value;
                                }
                            }
                            if (Object.keys(runtimeParams).length > 0) {
                                params = Object.assign(Object.assign({}, runtimeParams), params);
                            }
                        }
                        return resultWrapper.createViewModel(params, options);
                    };
                    const definitionWrapper = {
                        template: resultWrapper.template,
                        createViewModel: createViewModelWrapper,
                        constructor: config.constructor,
                        encapsulation: config.encapsulation
                    };
                    callback(definitionWrapper);
                };
                ko.components.defaultLoader.loadComponent(componentName, config, callbackWrapper);
            },
        };
        ko.components.loaders.unshift(injectableComponentLoader);
        ko.bindingProvider.instance.preprocessNode = (node) => {
            if (node.removeAttribute) {
                setImmediate(() => node.removeAttribute("data-bind"));
            }
            return null;
        };
    }
}
exports.KnockoutRegistrationLoaders = KnockoutRegistrationLoaders;
//# sourceMappingURL=knockout.loaders.js.map