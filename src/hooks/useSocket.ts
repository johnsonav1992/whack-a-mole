import {
    useCallback
    , useEffect
    , useRef
    , useState
} from 'react';
import {
    Socket
    , io
} from 'socket.io-client';

const DEFAULT_URL = 'http://localhost:8000';
const DEFAULT_OPTIONS: SocketOptions = {
    transports: [ 'websocket' ]
};

type SocketOptions = Parameters<typeof io>[1];
type DefaultEventsMap = Record<string, ( ...args: never[] ) => void>;

type UseSocketParams<L extends DefaultEventsMap> = {
    url?: string;
    namespace?: `/${ string }`;
    options?: SocketOptions;
    listenEvents?: L;
    enabled?: boolean;
};

/**
 * useSocket Hook
 *
 * @description a hook for easily connecting to a backend via Socket.io
 * @param params - This is an optional parameters object for configuring the socket connection
 *
 * @returns socket object for listening to and emitting events, connection state & any connection errors
 *
 * @example
 * ```
 * // Initialized hook with registered listener event handlers
 * const { socket } = useSocket( {
 *      listenEvents: {
 *          'messageReceived': ( message ) => console.log( message )
 *          , 'userLoggedOn': ( userId ) => console.log( `User ${ userId } has logged on!` )
 *      }
 * } )
 * // In Component onClick handler
 * onClick={ () => socket.emit( 'message', 'Hi!' ) }
 * ```
 *
 */
export const useSocket = <
    ListenEvents extends DefaultEventsMap = DefaultEventsMap,
    EmitEvents extends DefaultEventsMap = DefaultEventsMap
>( params?: UseSocketParams<ListenEvents> ) => {
    const enabled = params?.enabled ?? true;

    const socketRef = useRef<Socket<ListenEvents, EmitEvents> | null>( null );
    const remoteListeners = useRef<Map<keyof ListenEvents, ListenEvents[keyof ListenEvents]>>( new Map() );

    const [ isConnected, setIsConnected ] = useState<boolean>( false );
    const [ connectError, setConnectError ] = useState<string | null>( null );

    useEffect( () => {
        if ( !enabled ) return;

        const URL = `${ params?.url || DEFAULT_URL }${ params?.namespace || '' }`;

        const socket: Socket<ListenEvents, EmitEvents> = io(
            URL,
            {
                ...DEFAULT_OPTIONS
                , ...params?.options
                , query: { ...params?.options?.query }
            }
        );

        socketRef.current = socket;

        return () => {
            socket?.disconnect();
        };
    }, [ enabled ] );

    useEffect( () => {
        const onConnect = () => setIsConnected( true );
        const onDisconnect = () => setIsConnected( false );
        const onConnectError = ( error: Error ) => {
            console.error( `Error connecting to web socket - ${ error.message }` );
            setConnectError( error.message );
        };

        socketRef.current?.on( 'connect', onConnect );
        socketRef.current?.on( 'disconnect', onDisconnect );
        socketRef.current?.on( 'connect_error', onConnectError );

        params?.listenEvents
            && Object.entries( params.listenEvents ).forEach( ( [ eventName, callback ] ) => {
                socketRef.current?.on( eventName, callback as never );
            } );

        return () => {
            socketRef.current?.off( 'connect', onConnect );
            socketRef.current?.off( 'disconnect', onDisconnect );
            socketRef.current?.off( 'connect_error', onConnectError );

            params?.listenEvents
                && Object.entries( params.listenEvents ).forEach( ( [ eventName, callback ] ) =>
                    socketRef.current?.off( eventName, callback as never )
                );
        };
    }, [] );

    // For registering remote listeners (not set in the main useSocket call)
    useEffect( () => {
        const listeners = remoteListeners.current.entries();
        for ( const [ eventName, callback ] of listeners ) {
            if ( socketRef.current?.hasListeners( eventName as string ) ) continue;

            socketRef.current?.on( eventName as string, callback as never );
        }

        return () => {
            for ( const [ eventName, callback ] of listeners ) {
                socketRef.current?.off( eventName as string, callback as never );
            }
        };
    }, [ remoteListeners.current ] );

    const registerEvent = useCallback(
        <EventName extends keyof ListenEvents>( eventName: EventName, callback: ListenEvents[EventName] ) => {
            remoteListeners.current.set( eventName, callback );
        },
        []
    );

    return {
        socket: socketRef.current
        , isConnected
        , connectError
        , registerEvent
    };
};
