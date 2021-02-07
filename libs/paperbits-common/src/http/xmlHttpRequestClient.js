"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlHttpRequestClient = void 0;
const XMLHttpRequest = require("xhr2");
const httpResponse_1 = require("./httpResponse");
class XmlHttpRequestClient {
    constructor() {
        this.send = this.send.bind(this);
    }
    parseHeaderString(headerString) {
        if (!headerString) {
            return [];
        }
        const headers = [];
        const headerPairs = headerString.split("\u000d\u000a");
        for (const headerPair of headerPairs) {
            const index = headerPair.indexOf("\u003a\u0020");
            if (index > 0) {
                const name = headerPair.substring(0, index);
                const value = headerPair.substring(index + 2);
                const header = {
                    name: name,
                    value: value
                };
                headers.push(header);
            }
        }
        return headers;
    }
    send(request) {
        if (!request.method) {
            request.method = "GET";
        }
        if (!request.headers) {
            request.headers = [];
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const onRequestTimeout = () => {
                reject({
                    message: `Request timed out. Please try again later.`,
                    code: "RequestError",
                    details: []
                });
            };
            const onStateChange = () => {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status === 0) {
                    reject({
                        message: `Could not complete the request. Please try again later.`,
                        code: "RequestError",
                        requestedUrl: request.url,
                        details: []
                    });
                    return;
                }
                const response = new httpResponse_1.HttpResponse();
                response.statusCode = xhr.status;
                response.statusText = xhr.statusText;
                response.headers = this.parseHeaderString(xhr.getAllResponseHeaders());
                response.body = new Uint8Array(xhr.response);
                resolve(response);
            };
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = onStateChange.bind(this);
            xhr.ontimeout = onRequestTimeout.bind(this);
            xhr.open(request.method, request.url, true);
            request.headers.forEach((header) => {
                xhr.setRequestHeader(header.name, header.value);
            });
            xhr.send(request.body);
        });
    }
}
exports.XmlHttpRequestClient = XmlHttpRequestClient;
//# sourceMappingURL=xmlHttpRequestClient.js.map