import {
    Dispatch
    , SetStateAction
    , useState
} from 'react';

// MUI
import {
    Box
    , Button
    , Grid
    , Stack
    , Tooltip
    , Typography
} from '@mui/material';
import { Add } from '@mui/icons-material';

// Components
import RoomCard from '../RoomCard/RoomCard';
import CreateRoomModal from '../CreateRoomModal/CreateRoomModal';

// Types
import {
    GameRoom
    , GameSettings
    , GameStep
} from '../../types/types';
import { ClientToServerEvents } from '../../../backend/types/socketEventTypes';
import { Socket } from 'socket.io-client';

// Utils
import { MAX_ROOMS } from '../../utils/gameSettings';

type Props = {
    rooms: GameRoom[];
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
    gameSettings: GameSettings;
    socket: Socket<ClientToServerEvents> | null;
};

const WaitingRoom = ( {
    rooms
    , setRooms
    , setGameStep
    , gameSettings
    , socket
}: Props ) => {
    const [ modalIsOpen, setModalIsOpen ] = useState( false );

    const roomUserIsCurrentlyIn = rooms.filter( room => room.currentPlayers.includes( gameSettings.userName ) )[ 0 ];
    const createButtonDisabled = MAX_ROOMS === rooms.length || !!roomUserIsCurrentlyIn;

    const getTooltipText = () => {
        switch ( true ) {
            case MAX_ROOMS === rooms.length:
                return 'Max number of rooms created. Please wait to create a new room.';
            case !!roomUserIsCurrentlyIn:
                return 'You are already in a room. Please leave that room to create a new one.';
            default:
                return '';
        }
    };

    return (
        <Stack
            alignItems='center'
            gap='2rem'
        >
            <Grid
                container
                wrap='wrap'
                gap='1rem'
            >
                {
                    rooms.length
                        ? rooms.map( room => (
                            <Grid
                                item
                                key={ room.name }
                            >
                                <RoomCard
                                    room={ room }
                                    rooms={ rooms }
                                    setRooms={ setRooms }
                                    setGameStep={ setGameStep }
                                    gameSettings={ gameSettings }
                                    roomUserIsCurrentlyIn={ roomUserIsCurrentlyIn }
                                    socket={ socket }
                                />
                            </Grid>
                        ) )
                        : (
                            <Typography>
                                No rooms available. Create one by clicking the button below!
                            </Typography>
                        )
                }
            </Grid>
            <Tooltip
                title={ getTooltipText() }
            >
                <Box>
                    <Button
                        variant='contained'
                        disabled={ createButtonDisabled }
                        startIcon={ <Add /> }
                        onClick={ () => setModalIsOpen( true ) }
                    >
                        Create Room
                    </Button>
                </Box>
            </Tooltip>
            <CreateRoomModal
                open={ modalIsOpen }
                onClose={ () => setModalIsOpen( false ) }
                rooms={ rooms }
                setRooms={ setRooms }
                gameSettings={ gameSettings }
                socket={ socket }
            />
        </Stack>
    );
};

export default WaitingRoom;
