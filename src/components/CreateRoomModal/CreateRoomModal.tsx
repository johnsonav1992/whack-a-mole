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
    , Typography
} from '@mui/material';

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';
import { Close } from '@mui/icons-material';

type Props = DialogProps & {
    rooms: GameRoom[];
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
    gameSettings: GameSettings;
};

const CreateRoomModal = ( {
    open
    , onClose
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
        <Dialog
            open={ open }
            onClose={ onClose }
        >
            <DialogTitle>
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
                <Typography
                    mt='1rem'
                    variant='h6'
                >
                    Select a Room Name
                </Typography>
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
