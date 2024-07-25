import { Server } from "socket.io";

const io = new Server(8080, {cors: { origin: "*" }, transports: ['websocket']});

console.log('Socket.io server running on port 8080');

io.on('connection', socket => {
    console.log('a user connected - ' + socket.id);
})
