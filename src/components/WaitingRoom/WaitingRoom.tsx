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
import { GameRoom } from '../../types/types';

// Utils
import { MAX_ROOMS } from '../../utils/gameSettings';

type Props = {
    rooms: GameRoom[];
};

const WaitingRoom = ( { rooms }: Props ) => {
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
                                />
                            </Grid>
                        ) )
                        : (
                            <Typography>
                                No rooms available
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
