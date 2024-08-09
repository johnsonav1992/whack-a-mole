// MUI
import {
    Button
    , Card
    , Divider
    , IconButton
    , Stack
    , Tooltip
    , Typography
} from '@mui/material';
import {
    CheckCircle
    , Close
    , Pending
} from '@mui/icons-material';

// Types
import {
    GameRoom
    , GameSettings
    , GameStep
} from '../../types/types';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../backend/types/socketEventTypes';
import {
    Dispatch
    , SetStateAction
} from 'react';
import {
    playerJoin
    , playerLeave
} from '../../utils/utils';

type Props = {
    room: GameRoom;
    rooms: GameRoom[];
    gameSettings: GameSettings;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
    roomUserIsCurrentlyIn: GameRoom;
    socket: Socket<ClientToServerEvents> | null;
    setRooms: Dispatch<SetStateAction<GameRoom[]>>;
};

const RoomCard = ( {
    rooms
    , room
    , gameSettings
    , setGameStep
    , roomUserIsCurrentlyIn
    , socket
    , setRooms
}: Props ) => {
    const roomIsFull = room.currentPlayers.every( Boolean );
    const userIsInRoom = room.currentPlayers.includes( gameSettings.userName );
    const userCannotJoinRoomBecauseTheyAreInAnotherRoom
        = roomUserIsCurrentlyIn
            ? roomUserIsCurrentlyIn.name !== room.name
            : false;

    const joinRoom = () => {
        playerJoin(
            {
                room: room.name
                , userName: gameSettings.userName
            }
            , setRooms
        );

        socket?.emit( 'join-room', {
            userName: gameSettings.userName
            , room: room.name
        } );
    };

    const leaveRoom = () => {
        playerLeave(
            gameSettings.userName,
            setRooms
        );

        socket?.emit( 'leave-room', {
            room: room.name
            , userName: gameSettings.userName
        } );
    };

    return (
        <Card
            sx={ {
                p: '1rem'
                , display: 'flex'
                , flexDirection: 'column'
                , gap: '.75rem'
                , alignItems: 'flex-start'
                , minWidth: '14rem'
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
                            width='100%'
                            gap='.75rem'
                            key={ player }
                        >
                            {
                                player
                                    ? (
                                        <Stack
                                            direction='row'
                                            minWidth='100%'
                                            justifyContent='space-between'
                                            alignItems='center'
                                        >
                                            <Stack
                                                direction='row'
                                                gap='.75rem'
                                            >
                                                <CheckCircle
                                                    color='success'
                                                    sx={ {
                                                        filter: theme =>
                                                            `drop-shadow(0 0 7px ${ theme.palette.success.light })`
                                                    } }
                                                />
                                                <Typography>
                                                    { player }
                                                </Typography>
                                            </Stack>
                                            {
                                                userIsInRoom
                                                && player === gameSettings.userName
                                                && (
                                                    <Tooltip title='Leave room'>
                                                        <IconButton onClick={ leaveRoom }>
                                                            <Close color='error' />
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }
                                        </Stack>
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
                        onClick={
                            userIsInRoom
                                ? () => setGameStep( 'level' )
                                : joinRoom
                        }
                    >
                        { userIsInRoom ? 'Start Game' : 'Join Room' }
                    </Button>
                </Stack>
            </Tooltip>
        </Card>
    );
};

export default RoomCard;
