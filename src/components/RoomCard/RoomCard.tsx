// MUI
import {
    Button
    , Card
    , Divider
    , Stack
    , Tooltip
    , Typography
} from '@mui/material';
import {
    CheckCircle
    , Pending
} from '@mui/icons-material';

// Types
import {
    GameRoom
    , GameSettings
} from '../../types/types';

type Props = {
    room: GameRoom;
    gameSettings: GameSettings;
    roomUserIsCurrentlyIn: GameRoom;
};

const RoomCard = ( {
    room
    , gameSettings
    , roomUserIsCurrentlyIn
}: Props ) => {
    const roomIsFull = room.currentPlayers.every( Boolean );
    const userIsInRoom = room.currentPlayers.includes( gameSettings.userName );
    const userCannotJoinRoomBecauseTheyAreInAnotherRoom
        = roomUserIsCurrentlyIn
            ? roomUserIsCurrentlyIn.name !== room.name
            : false;

    return (
        <Card
            sx={ {
                p: '1rem'
                , display: 'flex'
                , flexDirection: 'column'
                , gap: '.75rem'
                , alignItems: 'flex-start'
            } }
            elevation={ 3 }
        >
            <Typography variant='h4'>
                { room.name }
            </Typography>
            <Divider flexItem />
            {
                room.currentPlayers.map( player =>
                    (
                        <Stack
                            direction='row'
                            gap='.75rem'
                            key={ player }
                        >
                            {
                                player
                                    ? (
                                        <>
                                            <CheckCircle color='success' />
                                            <Typography>
                                                { player }
                                            </Typography>
                                        </>
                                    )
                                    : (
                                        <>
                                            <Pending color='action' />
                                            <Typography>
                                                Waiting for player...
                                            </Typography>
                                        </>
                                    )
                            }
                        </Stack>
                    )
                )
            }
            <Tooltip title={ roomIsFull ? 'Room is currently full' : '' }>
                <Stack
                    width='100%'
                    alignItems='center'
                >
                    <Button
                        variant='contained'
                        disabled={ ( roomIsFull && !userIsInRoom ) || userCannotJoinRoomBecauseTheyAreInAnotherRoom }
                    >
                        { userIsInRoom ? 'Start Game' : 'Join Room' }
                    </Button>
                </Stack>
            </Tooltip>
        </Card>
    );
};

export default RoomCard;
