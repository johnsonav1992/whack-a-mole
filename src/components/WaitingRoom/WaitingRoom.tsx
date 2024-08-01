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

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';

// Utils
import { MAX_ROOMS } from '../../utils/gameSettings';

type Props = {
    rooms: GameRoom[];
    gameSettings: GameSettings;
};

const WaitingRoom = ( {
    rooms
    , gameSettings
}: Props ) => {
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
                    >
                        Create Room
                    </Button>
                </Box>
            </Tooltip>
        </Stack>
    );
};

export default WaitingRoom;
