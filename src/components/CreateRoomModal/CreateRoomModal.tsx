import {
    Dispatch
    , SetStateAction
    , useState
} from 'react';

// MUI
import {
    Box
    , Button
    , Dialog
    , DialogContent
    , DialogProps
    , DialogTitle
    , IconButton
    , Stack
    , TextField
} from '@mui/material';

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';
import { Close } from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../backend/types/socketEventTypes';

type Props = DialogProps & {
    rooms: GameRoom[];
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
    gameSettings: GameSettings;
    socket: Socket<ClientToServerEvents> | null;
};

const CreateRoomModal = ( {
    open
    , onClose
    , rooms
    , setRooms
    , gameSettings
    , socket
}: Props ) => {
    const [ roomName, setRoomName ] = useState( '' );

    const isDuplicateRoomName = rooms.some( room => room.name === roomName ) && open;

    const createRoom = () => {
        setRooms( rooms => [
            ...rooms
            , {
                name: roomName
                , currentPlayers: [ gameSettings.userName, null ]
            }
        ] );

        socket?.emit( 'join-room', {
            room: roomName
            , userName: gameSettings.userName
        } );

        setRoomName( '' );
        onClose?.( {}, '' as never );
    };

    return (
        <Dialog
            open={ open }
            onClose={ onClose }
            PaperProps={ { sx: { p: '1rem' } } }
        >
            <DialogTitle sx={ { fontSize: '2rem' } }>
                <Box
                    sx={ {
                        right: '.25rem'
                        , top: '.25rem'
                        , position: 'absolute'
                    } }
                >
                    <IconButton
                        onClick={ () => {
                            setRoomName( '' );
                            onClose?.( {}, '' as never );
                        } }
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Box mt='1rem'>
                    Select a Room Name
                </Box>
            </DialogTitle>
            <DialogContent>
                <Stack gap='1rem'>
                    <TextField
                        value={ roomName }
                        onChange={ e => setRoomName( e.target.value ) }
                        error={ isDuplicateRoomName }
                        helperText={ isDuplicateRoomName && 'Room name already taken' }
                    />
                    <Button
                        variant='contained'
                        onClick={ createRoom }
                        disabled={ !roomName || isDuplicateRoomName }
                    >
                        Create
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRoomModal;
