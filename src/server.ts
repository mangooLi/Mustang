import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

const app = express();
const listener = http.createServer(app);
const io = socketio(listener);

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/static/index.html");
});

io.on("connection",(socket) => {
    console.log("a user connected");
    socket.on('chat message', (msg: string) => {
        console.log('message: ' + msg);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

listener.listen(3000, () => {
    console.log("Server listening on port 3000");
    console.log("test...");
});