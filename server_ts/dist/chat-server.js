"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.headers = {
            extraHeaders: {
                'Authorization': 'Bearer 1@3#42WEvZX690!FFFG'
            }
        };
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    ChatServer.prototype.createApp = function () {
        this.app = express();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });
    };
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    ChatServer.prototype.config = function () {
        this.port = process.env.PORT || ChatServer.PORT;
    };
    ChatServer.prototype.sockets = function () {
        this.io = socketIo(this.server, { origins: '*:*' });
    };
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log("Running server on port " + _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log("Connected client on port " + _this.port);
            socket.on('message', function (m) {
                console.log("[server](message): " + JSON.stringify(m));
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8383;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
