import { 
    Server
    , Socket
} from "socket.io";

const io = new Server(8000, { cors: { origin: '*' } } );

io.on( "connection", ( socket: Socket ) => {
    console.log( socket.id )
} );
