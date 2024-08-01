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

// Components
import RoomCard from '../RoomCard/RoomCard';
import CreateRoomModal from '../CreateRoomModal/CreateRoomModal';

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';

// Utils
import { MAX_ROOMS } from '../../utils/gameSettings';

type Props = {
    rooms: GameRoom[];
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
    gameSettings: GameSettings;
};

const WaitingRoom = ( {
    rooms
    , setRooms
    , gameSettings
}: Props ) => {
    const [ modalIsOpen, setModalIsOpen ] = useState( false );

    const createButtonDisabled = MAX_ROOMS === rooms.length;

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
                                    gameSettings={ gameSettings }
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
                title={
                    createButtonDisabled
                        ? 'Max number of rooms created. Please wait to create a new room.'
                        : ''
                }
            >
                <Box>
                    <Button
                        variant='contained'
                        disabled={ createButtonDisabled }
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
            />
        </Stack>
    );
};

export default WaitingRoom;
