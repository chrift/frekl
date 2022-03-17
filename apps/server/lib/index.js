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
var ws_1 = require("ws");
var msgQueue = [];
var wss = new ws_1.WebSocketServer({ port: 8002 });
var socket;
wss.on('connection', function connection(ws) {
    console.log('Frekl websocket client connected');
    socket = ws;
    // ws.on('message', function message (data) {
    //   console.log('received: %s', data)
    // })
    //
    // ws.send('something')
    setInterval(function () {
        if (msgQueue.length) {
            try {
                send(msgQueue.splice(0, msgQueue.length));
            }
            catch (e) {
                console.error(__dirname, e);
            }
        }
    }, 500);
});
wss.on('error', function (e) {
    console.error(e);
});
wss.on('listening', function () {
    console.log("Frekl websocket available at ".concat(JSON.stringify(wss.address())));
});
var send = function (msg) {
    if (socket) {
        socket.send(JSON.stringify(msg));
    }
};
// --------------------creating a udp server --------------------
// creating a udp server
var server = udp.createSocket('udp4');
// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    // server.close()
});
var maxQueueLength = 500;
var maxGroupLength = 100;
// emits on new datagram msg
server.on('message', function (msg, info) {
    try {
        msgQueue.push(JSON.parse(msg.toString()));
        // @todo restrict size by group
        if (msgQueue.length > maxQueueLength) {
            msgQueue.splice(0, maxQueueLength);
        }
    }
    catch (e) {
        console.error(e);
    }
});
//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    var address = server.address();
    var port = address.port;
    var ipaddr = address.address;
    console.log("Frekl udp server available at http://".concat(ipaddr, ":").concat(port));
});
//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log('Socket is closed!');
});
server.bind(8003);
