import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as redisAdapter from "socket.io-redis";
import * as dns from "dns";
import * as retry from "retry";

function faultTolerantResolve(address: string, cb: (err:Error , errs: Error[], addresses:string[]) => void) {
    let opts:retry.OperationOptions = {
        retries: 3,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: 2 * 1000,
        randomize: true
    };

    let operation = retry.operation(opts);

    operation.attempt((current) => {
        dns.resolve(address, (err,addresses) => {
            if(operation.retry(err)){
                return ;
            }
            cb(operation.mainError(), operation.errors(), addresses);
        });
    });
}

faultTolerantResolve('nodejis.org', (err, errs, addresses) => {
    console.warn('err:');
    console.log(err);

    console.warn('addresses:');
    console.log(addresses);
});


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

io.on("connection",(socket) => {
    if (socket.request.host) {

    } else {
        socket.emit('test', {code:40001, remark: 'error'});
        socket.disconnect();
    }
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