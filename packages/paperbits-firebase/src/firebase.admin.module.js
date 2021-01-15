"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
var firebaseObjectStorage_admin_1 = require("./persistence/firebaseObjectStorage.admin");
var firebaseBlobStorage_admin_1 = require("./persistence/firebaseBlobStorage.admin");
var firebaseService_admin_1 = require("./services/firebaseService.admin");
var serviceAccountCredentialProvider_1 = require("./services/serviceAccountCredentialProvider");
var FirebaseModule = (function () {
    function FirebaseModule() {
    }
    FirebaseModule.prototype.register = function (injector) {
        injector.bindSingleton("firebaseService", firebaseService_admin_1.FirebaseService);
        injector.bindSingleton("blobStorage", firebaseBlobStorage_admin_1.FirebaseBlobStorage);
        injector.bindSingleton("objectStorage", firebaseObjectStorage_admin_1.FirebaseObjectStorage);
        injector.bindSingleton("firebaseCredentialProvider", serviceAccountCredentialProvider_1.ServiceAccountCredentialProvider);
    };
    return FirebaseModule;
}());
exports.FirebaseModule = FirebaseModule;
