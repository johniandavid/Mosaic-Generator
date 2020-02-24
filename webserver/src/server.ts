import express from "express";
import http_lib from 'http';
import path_lib from 'path';
import io from 'socket.io';
import StreamList from './twitchStreams/StreamList';

const PORT = process.env.PORT || 3000;
const streams: StreamList = new StreamList();

// Express Server
const app = express();
app.use(express.static(path_lib.join(__dirname, 'public')));
const http = http_lib.createServer(app);
const serverio = io(http);

// app.get('/', (req, response) => {
//   // Don't know what this is yet
//   console.log(req);
// })

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

serverio.on('connection', (socket) => {

  // Audience controls
  socket.on('join room', ({ channel }) => {
    socket.join(`${channel}`, () => {
      console.log(`JOIN_ROOM ${channel}: User joined`);
      // serverio.to('${socket.id}').emit('Campain_State', streams[channel].state())
      // get the state of the current campain
    });
  })

  socket.on('request_state', ({ channel }) => {
    // serverio.to('${socket.id}').emit('Campain_State', streams[channel].state())
  })

  //Streamer controls
  socket.on('streamer_join', ({ channel }) => {
    streams.add(channel);
    console.log(`ChannelID ${channel} was added to the streamList`);
    socket.join(`${channel}`, () => {
      console.log(`JOIN_ROOM ${channel}: Streamer joined`);
    })
  })

  socket.on('message_room', ({ channel, message }) => {
    serverio.to(`${channel}`).emit('room_message', message);
    console.log(streams);
  })
});

function dateString() {
  return new Date().toString();
};
