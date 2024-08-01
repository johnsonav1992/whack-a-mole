import {
    Dispatch
    , SetStateAction
    , useState
} from 'react';

// MUI
import {
    Button
    , Dialog
    , DialogContent
    , DialogProps
    , DialogTitle
    , Stack
    , TextField
} from '@mui/material';

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';

type Props = DialogProps & {
    rooms: GameRoom[];
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
    gameSettings: GameSettings;
};

const CreateRoomModal = ( {
    open
    , rooms
    , setRooms
    , gameSettings
}: Props ) => {
    const [ roomName, setRoomName ] = useState( '' );

    const isDuplicateRoomName = rooms.some( room => room.name === roomName );

    const createRoom = () => {
        setRooms( rooms => [
            ...rooms
            , {
                name: roomName
                , currentPlayers: [ gameSettings.userName, null ]
            }
        ] );
    };

    return (
        <Dialog open={ open }>
            <DialogTitle>
                Select a Room Name
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
