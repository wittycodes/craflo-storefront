"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
var firebaseObjectStorage_1 = require("./persistence/firebaseObjectStorage");
var firebaseBlobStorage_1 = require("./persistence/firebaseBlobStorage");
var firebaseService_1 = require("./services/firebaseService");
var firebaseUserService_1 = require("./services/firebaseUserService");
var basicAuthService_1 = require("./services/basicAuthService");
var FirebaseModule = (function () {
    function FirebaseModule() {
        this.register = this.register.bind(this);
    }
    FirebaseModule.prototype.register = function (injector) {
        injector.bindSingleton("firebaseService", firebaseService_1.FirebaseService);
        injector.bindSingleton("userService", firebaseUserService_1.FirebaseUserService);
        injector.bindSingleton("blobStorage", firebaseBlobStorage_1.FirebaseBlobStorage);
        injector.bindSingleton("objectStorage", firebaseObjectStorage_1.FirebaseObjectStorage);
        injector.bindSingleton("firebaseAuthService", basicAuthService_1.BasicAuthService);
    };
    return FirebaseModule;
}());
exports.FirebaseModule = FirebaseModule;
