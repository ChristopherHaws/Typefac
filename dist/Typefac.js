var Typefac;
(function (Typefac) {
    var ContainerBuilder = (function () {
        function ContainerBuilder() {
            var _this = this;
            this.build = function () {
                if (_this.wasBuilt) {
                    throw new Error("build() or update() can only be called once on a ContainerBuilder.");
                }
                var container = new Typefac.Core.Container();
                _this.registrations.forEach(function (registration) {
                    container.componentRegistry.register(registration.component);
                });
                _this.wasBuilt = true;
                return container;
            };
            this.registerType = function (type) {
                var registration = new Typefac.Builder.RegistrationBuilder(type);
                _this.registrations.push(registration);
                return registration;
            };
            this.registerInstance = function (instance) {
                throw new Error("Not implemented");
            };
            this.wasBuilt = false;
            this.registrations = [];
        }
        return ContainerBuilder;
    })();
    Typefac.ContainerBuilder = ContainerBuilder;
})(Typefac || (Typefac = {}));
/// <reference path="bower_components/dt-jquery/jquery.d.ts" /> 
var Typefac;
(function (Typefac) {
    var Utilities;
    (function (Utilities) {
        var ArrayEx = (function () {
            function ArrayEx() {
            }
            ArrayEx.firstOrDefault = function (values, predicate) {
                var length = values.length;
                for (var i = 0; i < length; i++) {
                    var value = values[i];
                    if (predicate(value, i)) {
                        return value;
                    }
                }
                return null;
            };
            ArrayEx.lastOrDefault = function (values, predicate) {
                for (var i = values.length - 1; i >= 0; i--) {
                    var value = values[i];
                    if (predicate(value, i)) {
                        return value;
                    }
                }
                return null;
            };
            return ArrayEx;
        })();
        Utilities.ArrayEx = ArrayEx;
    })(Utilities = Typefac.Utilities || (Typefac.Utilities = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Utilities;
    (function (Utilities) {
        var ObjectEx = (function () {
            function ObjectEx() {
            }
            ObjectEx.getClassName = function (value) {
                var results;
                if (typeof value == "object") {
                    results = (ObjectEx.funcNameRegex).exec((value).constructor.toString());
                }
                else {
                    results = (ObjectEx.funcNameRegex).exec((value).toString());
                }
                return (results && results.length > 1) ? results[1] : "";
            };
            ObjectEx.getFunctionArgumentsNames = function (type) {
                var result = type.toString().match(this.functionArguments);
                if (result === null) {
                    return new Array();
                }
                if (result[1] === "") {
                    return new Array();
                }
                return new Array(result[1]);
            };
            ObjectEx.funcNameRegex = /function (.{1,})\(/;
            ObjectEx.functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
            return ObjectEx;
        })();
        Utilities.ObjectEx = ObjectEx;
    })(Utilities = Typefac.Utilities || (Typefac.Utilities = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Collections;
        (function (Collections) {
            var ArraySuffixCollectionNamingRule = (function () {
                function ArraySuffixCollectionNamingRule() {
                    this.isCollection = function (name) {
                        return Typefac.Utilities.StringEx.endsWith(name, "Array", true);
                    };
                    this.getName = function (name) {
                        return Typefac.Utilities.StringEx.removeFromEnd(name, "Array", true);
                    };
                }
                return ArraySuffixCollectionNamingRule;
            })();
            Collections.ArraySuffixCollectionNamingRule = ArraySuffixCollectionNamingRule;
        })(Collections = Core.Collections || (Core.Collections = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Collections;
        (function (Collections) {
            var CollectionSuffixCollectionNamingRule = (function () {
                function CollectionSuffixCollectionNamingRule() {
                    this.isCollection = function (name) {
                        return Typefac.Utilities.StringEx.endsWith(name, "Collection", true);
                    };
                    this.getName = function (name) {
                        return Typefac.Utilities.StringEx.removeFromEnd(name, "Collection", true);
                    };
                }
                return CollectionSuffixCollectionNamingRule;
            })();
            Collections.CollectionSuffixCollectionNamingRule = CollectionSuffixCollectionNamingRule;
        })(Collections = Core.Collections || (Core.Collections = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Features;
    (function (Features) {
        var ServiceResolvers;
        (function (ServiceResolvers) {
            var ObjectEx = Typefac.Utilities.ObjectEx;
            var ConstructorServiceResolver = (function () {
                function ConstructorServiceResolver() {
                }
                ConstructorServiceResolver.prototype.canResolve = function (componentRegistration) {
                    return true;
                };
                ConstructorServiceResolver.prototype.getServiceNames = function (componentRegistration) {
                    return ObjectEx.getFunctionArgumentsNames(componentRegistration.type);
                };
                return ConstructorServiceResolver;
            })();
            ServiceResolvers.ConstructorServiceResolver = ConstructorServiceResolver;
        })(ServiceResolvers = Features.ServiceResolvers || (Features.ServiceResolvers = {}));
    })(Features = Typefac.Features || (Typefac.Features = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Features;
    (function (Features) {
        var ServiceResolvers;
        (function (ServiceResolvers) {
            var ObjectEx = Typefac.Utilities.ObjectEx;
            var StaticPropertyServiceResolver = (function () {
                function StaticPropertyServiceResolver() {
                }
                StaticPropertyServiceResolver.prototype.canResolve = function (componentRegistration) {
                    if (!componentRegistration.type.hasOwnProperty("$inject") || !componentRegistration.type.propertyIsEnumerable("$inject")) {
                        return false;
                    }
                    var requestedServices = componentRegistration.type["$inject"];
                    //TODO: Might want to check to see if all of the parameters are registered...
                    var validationTests = [
                        this.validateParameterCount(componentRegistration, requestedServices),
                        this.validateAllStrings(componentRegistration, requestedServices)
                    ];
                    return validationTests.every(function (testResult) {
                        return testResult;
                    });
                };
                StaticPropertyServiceResolver.prototype.getServiceNames = function (componentRegistration) {
                    if (!this.canResolve(componentRegistration)) {
                        throw new Error("StaticPropertyResolver is not able to get the services from '" + componentRegistration.typeName + "'.");
                    }
                    var requestedServices = componentRegistration.type["$inject"];
                    return requestedServices;
                };
                StaticPropertyServiceResolver.prototype.validateParameterCount = function (componentRegistration, requestedServices) {
                    var parameterCount = ObjectEx.getFunctionArgumentsNames(componentRegistration.type).length;
                    if (requestedServices.length !== parameterCount) {
                        return false;
                    }
                    return true;
                };
                StaticPropertyServiceResolver.prototype.validateAllStrings = function (componentRegistration, requestedServices) {
                    return requestedServices.every(function (value) {
                        if (typeof value !== "string") {
                            return false;
                        }
                        return true;
                    });
                };
                return StaticPropertyServiceResolver;
            })();
            ServiceResolvers.StaticPropertyServiceResolver = StaticPropertyServiceResolver;
        })(ServiceResolvers = Features.ServiceResolvers || (Features.ServiceResolvers = {}));
    })(Features = Typefac.Features || (Typefac.Features = {}));
})(Typefac || (Typefac = {}));
/// <reference path="collections/arraysuffixcollectionnamingrule.ts" />
/// <reference path="collections/collectionsuffixcollectionnamingrule.ts" />
/// <reference path="../features/constructorserviceresolver/constructorserviceresolver.ts" />
/// <reference path="../features/staticpropertyserviceresolver/staticpropertyserviceresolver.ts" />
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Configuration = (function () {
            function Configuration() {
            }
            Configuration.collectionNamingRules = [
                new Core.Collections.ArraySuffixCollectionNamingRule(),
                new Core.Collections.CollectionSuffixCollectionNamingRule()
            ];
            Configuration.serviceResolvers = [
                new Typefac.Features.ServiceResolvers.ConstructorServiceResolver(),
                new Typefac.Features.ServiceResolvers.StaticPropertyServiceResolver()
            ];
            return Configuration;
        })();
        Core.Configuration = Configuration;
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
/// <reference path="../../utilities/objectex.ts" />
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Registration;
        (function (Registration) {
            var ObjectEx = Typefac.Utilities.ObjectEx;
            var ComponentRegistration = (function () {
                function ComponentRegistration(type) {
                    this.names = [];
                    this.sharing = Core.InstanceSharing.None;
                    this.type = type;
                }
                Object.defineProperty(ComponentRegistration.prototype, "typeName", {
                    get: function () {
                        return ObjectEx.getClassName(this.type);
                    },
                    enumerable: true,
                    configurable: true
                });
                return ComponentRegistration;
            })();
            Registration.ComponentRegistration = ComponentRegistration;
        })(Registration = Core.Registration || (Core.Registration = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        /**
         * Determines whether instances are shared within a lifetime scope.
         */
        (function (InstanceSharing) {
            /**
             * Each request for an instance will return a new object.
             */
            InstanceSharing[InstanceSharing["None"] = 0] = "None";
            /**
             * Each request for an instance will return the same object.
             */
            InstanceSharing[InstanceSharing["Shared"] = 1] = "Shared";
        })(Core.InstanceSharing || (Core.InstanceSharing = {}));
        var InstanceSharing = Core.InstanceSharing;
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
/// <reference path="../utilities/array.ts" />
/// <reference path="../utilities/objectex.ts" />
/// <reference path="../core/configuration.ts" />
/// <reference path="../core/registration/componentregistration.ts" />
/// <reference path="../core/registration/icomponentregistration.ts" />
/// <reference path="../core/instancesharing.ts" />
/// <reference path="iregistrationbuilder.ts" />
var Typefac;
(function (Typefac) {
    var Builder;
    (function (Builder) {
        var ArrayEx = Typefac.Utilities.ArrayEx;
        var ObjectEx = Typefac.Utilities.ObjectEx;
        var Configuration = Typefac.Core.Configuration;
        var ComponentRegistration = Typefac.Core.Registration.ComponentRegistration;
        var InstanceSharing = Typefac.Core.InstanceSharing;
        var RegistrationBuilder = (function () {
            function RegistrationBuilder(type) {
                var _this = this;
                this.asSelf = function () {
                    return _this.as(_this.component.typeName);
                };
                this.as = function (serviceName) {
                    var serviceNameLower = serviceName.toLowerCase();
                    var matchedCollectionNamingRule = ArrayEx.firstOrDefault(Configuration.collectionNamingRules, function (rule) {
                        if (rule.isCollection(serviceNameLower)) {
                            return true;
                        }
                        return false;
                    });
                    if (matchedCollectionNamingRule) {
                        var ruleTypeName = ObjectEx.getClassName(matchedCollectionNamingRule);
                        throw new Error("Could not register '" + serviceName + "' because it matches the reserved collection naming rule '" + ruleTypeName + "'.");
                    }
                    if (_this.component.names.indexOf(serviceNameLower) !== -1) {
                        throw new Error("Could not register '" + _this.component.typeName + "' as '" + serviceName + "' because is has already been registered using that name.");
                    }
                    _this.component.names.push(serviceNameLower);
                    return _this;
                };
                this.instancePerDependency = function () {
                    _this.component.sharing = InstanceSharing.None;
                    return _this;
                };
                this.singleInstance = function () {
                    _this.component.sharing = InstanceSharing.Shared;
                    return _this;
                };
                if (typeof type !== "function") {
                    throw new Error("Unable to register type because it is not a valid function.\n" + type.toString());
                }
                this.component = new ComponentRegistration(type);
            }
            return RegistrationBuilder;
        })();
        Builder.RegistrationBuilder = RegistrationBuilder;
    })(Builder = Typefac.Builder || (Typefac.Builder = {}));
})(Typefac || (Typefac = {}));
/// <reference path="../utilities/array.ts" />
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var ArrayEx = Typefac.Utilities.ArrayEx;
        var Container = (function () {
            function Container() {
                var _this = this;
                this.functionArguments = /^function\s*[^\(]*\(\s*([^\)]*)\)/m.source;
                this.resolve = function (name) {
                    var collectionNamingRule = Typefac.Utilities.ArrayEx.firstOrDefault(Core.Configuration.collectionNamingRules, function (rule) {
                        if (rule.isCollection(name)) {
                            return true;
                        }
                        return false;
                    });
                    if (collectionNamingRule) {
                        name = collectionNamingRule.getName(name);
                        return _this.resolveMultiple(name);
                    }
                    return _this.resolveSingle(name);
                };
                this.resolveSingle = function (name) {
                    var component = _this.componentRegistry.getRegistration(name);
                    var object = _this.resolveComponent(component);
                    if (!object) {
                        throw new Error("Unable to find a component with a service named '" + name + "'.");
                    }
                    return object;
                };
                this.resolveMultiple = function (name) {
                    var components = _this.componentRegistry.getRegistrations(name);
                    if (components.length <= 0) {
                        throw new Error("Unable to find any components with a service named '" + name + "'.");
                    }
                    return components.map(function (component) {
                        return _this.resolveComponent(component);
                    });
                };
                this.resolveComponent = function (component) {
                    if (component.sharing === Core.InstanceSharing.Shared && component.instance) {
                        return component.instance;
                    }
                    var serviceResolver = ArrayEx.lastOrDefault(Core.Configuration.serviceResolvers, function (resolver) {
                        return resolver.canResolve(component);
                    });
                    if (!serviceResolver) {
                        throw new Error("Could not find a service resolver that can resolve '" + component.typeName + "'.");
                    }
                    var parameters = serviceResolver.getServiceNames(component);
                    var dependancies = _this.createDependancies(parameters);
                    var boundClassDeclaration = Object.bind.apply(component.type, [null].concat(dependancies));
                    var object = new boundClassDeclaration();
                    if (component.sharing === Core.InstanceSharing.Shared) {
                        component.instance = object;
                    }
                    return object;
                };
                this.createDependancies = function (parameters) {
                    return parameters.map(function (parameter) {
                        return _this.resolve(parameter);
                    });
                };
                this.componentRegistry = new Core.Registration.ComponentRegistry();
            }
            return Container;
        })();
        Core.Container = Container;
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Utilities;
    (function (Utilities) {
        var Guid = (function () {
            function Guid(a, b, c, d, e) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.e = e;
            }
            Guid.newGuid = function () {
                return new Guid(Guid.s4() + Guid.s4(), Guid.s4(), Guid.s4(), Guid.s4(), Guid.s4() + Guid.s4() + Guid.s4());
            };
            Guid.prototype.toString = function () {
                return this.a + "-" + this.b + "-" + this.c + "-" + this.d + "-" + this.e;
            };
            Guid.s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            };
            return Guid;
        })();
        Utilities.Guid = Guid;
    })(Utilities = Typefac.Utilities || (Typefac.Utilities = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Utilities;
    (function (Utilities) {
        var StringEx = (function () {
            function StringEx() {
            }
            StringEx.startsWith = function (value, prefix, ignoreCase) {
                var tempValue = value;
                var tempPrefix = prefix;
                if (ignoreCase) {
                    tempValue = value.toLowerCase();
                    tempPrefix = prefix.toLowerCase();
                }
                return tempValue.indexOf(tempPrefix) === 0;
            };
            StringEx.endsWith = function (value, suffix, ignoreCase) {
                var tempValue = value;
                var tempSuffix = suffix;
                if (ignoreCase) {
                    tempValue = value.toLowerCase();
                    tempSuffix = suffix.toLowerCase();
                }
                return tempValue.indexOf(tempSuffix, tempValue.length - tempSuffix.length) !== -1;
            };
            StringEx.contains = function (value, search, ignoreCase) {
                var tempValue = value;
                var tempSearch = search;
                if (ignoreCase) {
                    tempValue = value.toLowerCase();
                    tempSearch = search.toLowerCase();
                }
                return tempValue.indexOf(tempSearch) !== -1;
            };
            StringEx.removeFromBeginning = function (value, prefix, ignoreCase) {
                var tempValue = value;
                var tempPrefix = prefix;
                if (ignoreCase) {
                    tempValue = value.toLowerCase();
                    tempPrefix = prefix.toLowerCase();
                }
                return tempValue.substr(tempPrefix.length, tempValue.length);
            };
            StringEx.removeFromEnd = function (value, suffix, ignoreCase) {
                var tempValue = value;
                var tempSuffix = suffix;
                if (ignoreCase) {
                    tempValue = value.toLowerCase();
                    tempSuffix = suffix.toLowerCase();
                }
                return tempValue.substr(0, tempValue.length - tempSuffix.length);
            };
            return StringEx;
        })();
        Utilities.StringEx = StringEx;
    })(Utilities = Typefac.Utilities || (Typefac.Utilities = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Exception = (function () {
        function Exception(message) {
            this.name = "Exception";
            this.message = message;
            this.stack = (new Error()).stack;
        }
        Exception.prototype.toString = function () {
            return this.name + ": " + this.message + "\n" + this.stack;
        };
        return Exception;
    })();
    Typefac.Exception = Exception;
})(Typefac || (Typefac = {}));
/// <reference path="exception.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Typefac;
(function (Typefac) {
    var ArgumentNullException = (function (_super) {
        __extends(ArgumentNullException, _super);
        function ArgumentNullException(parameter, message) {
            this.name = "ArgumentNullException";
            if (!message) {
                message = "Value cannot be null.";
            }
            if (parameter) {
                message += "\nParameter name: " + parameter;
            }
            _super.call(this, message);
        }
        return ArgumentNullException;
    })(Typefac.Exception);
    Typefac.ArgumentNullException = ArgumentNullException;
})(Typefac || (Typefac = {}));
/// <reference path="exception.ts" />
var Typefac;
(function (Typefac) {
    var DependencyResolutionException = (function (_super) {
        __extends(DependencyResolutionException, _super);
        function DependencyResolutionException(message) {
            _super.call(this, message);
        }
        return DependencyResolutionException;
    })(Typefac.Exception);
    Typefac.DependencyResolutionException = DependencyResolutionException;
})(Typefac || (Typefac = {}));
/// <reference path="../registration/icomponentregistry.ts" />
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Lifetime;
        (function (Lifetime) {
            var LifetimeScope = (function () {
                function LifetimeScope(componentRegistry, tag) {
                    this.beginLifetimeScope = function (callback) {
                        //var scope = new LifetimeScope();
                        //callback(scope);
                    };
                    this.selfRegistrationId = Typefac.Utilities.Guid.newGuid();
                    LifetimeScope.sharedInstances[this.selfRegistrationId.toString()] = this;
                    if (tag) {
                        this.tag = tag;
                    }
                    else {
                        this.tag = "root";
                    }
                }
                return LifetimeScope;
            })();
            Lifetime.LifetimeScope = LifetimeScope;
        })(Lifetime = Core.Lifetime || (Core.Lifetime = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Lifetime;
        (function (Lifetime) {
            var MatchingLifetimeScope = (function () {
                function MatchingLifetimeScope(lifetimeScopeTagsToMatch) {
                    if (!lifetimeScopeTagsToMatch) {
                        throw new Typefac.ArgumentNullException("lifetimeScopeTagsToMatch");
                    }
                    this.tagsToMatch = lifetimeScopeTagsToMatch;
                }
                MatchingLifetimeScope.prototype.findScope = function (mostNestedVisibleScope) {
                    if (!mostNestedVisibleScope) {
                        throw new Typefac.ArgumentNullException("mostNestedVisibleScope");
                    }
                    var next = mostNestedVisibleScope;
                    while (next != null) {
                        if (this.tagsToMatch.indexOf(next.tag) !== -1) {
                            return next;
                        }
                        next = next.parentLifetimeScope;
                    }
                    throw new Typefac.DependencyResolutionException("No scope with a Tag matching '" + this.tagsToMatch.join(", ") + "' is visible from the scope in which the instance was requested.");
                };
                return MatchingLifetimeScope;
            })();
            Lifetime.MatchingLifetimeScope = MatchingLifetimeScope;
        })(Lifetime = Core.Lifetime || (Core.Lifetime = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Lifetime;
        (function (Lifetime) {
            var RootScopeLifetime = (function () {
                function RootScopeLifetime() {
                }
                RootScopeLifetime.prototype.findScope = function (mostNestedVisibleScope) {
                    if (mostNestedVisibleScope == null) {
                        throw new Typefac.ArgumentNullException("mostNestedVisibleScope");
                    }
                    return mostNestedVisibleScope.rootLifetimeScope;
                };
                return RootScopeLifetime;
            })();
            Lifetime.RootScopeLifetime = RootScopeLifetime;
        })(Lifetime = Core.Lifetime || (Core.Lifetime = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
/// <reference path="../instancesharing.ts" />
/// <reference path="../../utilities/guid.ts" />
/// <reference path="../lifetime/icomponentlifetime.ts" />
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Registration;
        (function (Registration) {
            var ComponentRegistrationLifetimeDecorator = (function () {
                function ComponentRegistrationLifetimeDecorator(inner, lifetime) {
                    if (inner == null) {
                        throw new Typefac.ArgumentNullException("inner");
                    }
                    if (lifetime == null) {
                        throw new Typefac.ArgumentNullException("lifetime");
                    }
                    this.inner = inner;
                    this.lifetime = lifetime;
                }
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "id", {
                    get: function () {
                        return this.inner.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "lifetime", {
                    get: function () {
                        return this.lifetime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "names", {
                    get: function () {
                        return this.inner.names;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "sharing", {
                    get: function () {
                        return this.inner.sharing;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "type", {
                    get: function () {
                        return this.inner.type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "instance", {
                    get: function () {
                        return this.inner.instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRegistrationLifetimeDecorator.prototype, "typeName", {
                    get: function () {
                        return this.inner.typeName;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ComponentRegistrationLifetimeDecorator;
            })();
            Registration.ComponentRegistrationLifetimeDecorator = ComponentRegistrationLifetimeDecorator;
        })(Registration = Core.Registration || (Core.Registration = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Registration;
        (function (Registration) {
            var ComponentRegistry = (function () {
                function ComponentRegistry() {
                    var _this = this;
                    this.register = function (component) {
                        _this.components.push(component);
                    };
                    this.isRegistered = function (name) {
                        var component = _this.getRegistrationOrNull(name);
                        return (!!component);
                    };
                    this.getRegistration = function (name) {
                        var component = _this.getRegistrationOrNull(name);
                        if (!component) {
                            throw new Error("Could not find component '" + name + "'.");
                        }
                        return component;
                    };
                    this.getRegistrationOrNull = function (name) {
                        return Typefac.Utilities.ArrayEx.lastOrDefault(_this.components, function (component) {
                            if (component.names.indexOf(name.toLowerCase()) !== -1) {
                                return true;
                            }
                            return false;
                        });
                    };
                    this.getRegistrations = function (name) {
                        var components = _this.getRegistrationsOrNull(name);
                        if (!components || components.length <= 0) {
                            throw new Error("Could not find component '" + name + "'.");
                        }
                        return components;
                    };
                    this.getRegistrationsOrNull = function (name) {
                        return _this.components.filter(function (component) {
                            if (component.names.indexOf(name.toLowerCase()) !== -1) {
                                return true;
                            }
                            return false;
                        });
                    };
                    this.components = [];
                }
                return ComponentRegistry;
            })();
            Registration.ComponentRegistry = ComponentRegistry;
        })(Registration = Core.Registration || (Core.Registration = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
var Typefac;
(function (Typefac) {
    var Core;
    (function (Core) {
        var Registration;
        (function (Registration) {
            var ScopeRestrictedRegistry = (function (_super) {
                __extends(ScopeRestrictedRegistry, _super);
                function ScopeRestrictedRegistry(scopeTag) {
                    var _this = this;
                    _super.call(this);
                    this.register = function (registration) {
                        if (registration == null) {
                            throw new Typefac.ArgumentNullException("registration");
                        }
                        var toRegister = registration;
                        if (registration.lifetime instanceof Core.Lifetime.RootScopeLifetime) {
                            toRegister = new Registration.ComponentRegistrationLifetimeDecorator(registration, _this.restrictedRootScopeLifetime);
                        }
                        _this.components.push(toRegister);
                    };
                    this.restrictedRootScopeLifetime = new Core.Lifetime.MatchingLifetimeScope([scopeTag]);
                }
                return ScopeRestrictedRegistry;
            })(Registration.ComponentRegistry);
            Registration.ScopeRestrictedRegistry = ScopeRestrictedRegistry;
        })(Registration = Core.Registration || (Core.Registration = {}));
    })(Core = Typefac.Core || (Typefac.Core = {}));
})(Typefac || (Typefac = {}));
//# sourceMappingURL=Typefac.js.map