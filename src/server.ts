import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as redisAdapter from "socket.io-redis";
import {MiddlewareManager} from "./MiddlewareManager";

const middleware = new MiddlewareManager();
const app = express();
const listener = http.createServer(app);
const io = socketio(listener,{
    path: "/mustang",
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 10000,
    cookie: false
});

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/static/index.html");
});

io.on("connection", middleware.onConnection);

listener.listen(3000, () => {
    console.log("Server listening on port 3000");
    console.log("test...");
});