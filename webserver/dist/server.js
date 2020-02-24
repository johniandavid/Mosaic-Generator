"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = __importDefault(require("socket.io"));
var StreamList_1 = __importDefault(require("./twitchStreams/StreamList"));
var PORT = process.env.PORT || 3000;
var streams = new StreamList_1.default();
// Express Server
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
var http = http_1.default.createServer(app);
var serverio = socket_io_1.default(http);
// app.get('/', (req, response) => {
//   // Don't know what this is yet
//   console.log(req);
// })
http.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
serverio.on('connection', function (socket) {
    // Audience controls
    socket.on('join room', function (_a) {
        var channel = _a.channel;
        socket.join("" + channel, function () {
            console.log("JOIN_ROOM " + channel + ": User joined");
            // serverio.to('${socket.id}').emit('Campain_State', streams[channel].state())
            // get the state of the current campain
        });
    });
    socket.on('request_state', function (_a) {
        var channel = _a.channel;
        // serverio.to('${socket.id}').emit('Campain_State', streams[channel].state())
    });
    //Streamer controls
    socket.on('streamer_join', function (_a) {
        var channel = _a.channel;
        streams.add(channel);
        console.log("ChannelID " + channel + " was added to the streamList");
        socket.join("" + channel, function () {
            console.log("JOIN_ROOM " + channel + ": Streamer joined");
        });
    });
    socket.on('message_room', function (_a) {
        var channel = _a.channel, message = _a.message;
        serverio.to("" + channel).emit('room_message', message);
        console.log(streams);
    });
});
function dateString() {
    return new Date().toString();
}
;
