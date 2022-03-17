"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var udp = __importStar(require("dgram"));
require("server/lib");
require("web/server");
// creating a client socket
var client = udp.createSocket('udp4');
function send(groupKey, message) {
    groupKey = groupKey && groupKey.substring(0, 5000);
    message = typeof message === 'string' ? message.substring(0, 5000) : message;
    client.send(Buffer.from(JSON.stringify({ groupKey: groupKey, message: message })), 8003, 'localhost', function (error) {
        if (error) {
            console.error(__dirname, error, { groupKey: groupKey, message: message });
        }
    });
}
send.close = function () {
    client.close();
};
exports["default"] = send;
