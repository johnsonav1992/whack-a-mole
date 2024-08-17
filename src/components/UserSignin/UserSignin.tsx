// MUI
import {
    Button
    , FormControlLabel
    , Radio
    , RadioGroup
    , TextField
    , Typography
} from '@mui/material';

// Types
import { ClientToServerEvents } from '../../../backend/types/socketEventTypes';

// Utils
import { Socket } from 'socket.io-client';

// Hooks
import {
    useGameSettings
    , useGameStep
    , useRooms
} from '../../state/atoms';

type Props = {
    numPlayers: number;
    socket: Socket<ClientToServerEvents> | null;
};

const UserSignin = ( {
    numPlayers
    , socket
}: Props ) => {
    const rooms = useRooms( 'value' );
    const gameSettings = useGameSettings( 'value' );
    const setGameSettings = useGameSettings( 'set' );
    const setGameStep = useGameStep( 'set' );

    const usernameNotSelected = !gameSettings.userName;
    const isDuplicateUsername
        = rooms.some( room => room.currentPlayers.some( player => player === gameSettings.userName ) )
        && gameSettings.numPlayers === 2;

    const buttonDisabled = usernameNotSelected || isDuplicateUsername;

    const continueToNext = () => {
        if ( gameSettings.numPlayers === 2 ) {
            setGameStep( 'waiting' );
        } else {
            setGameStep( 'level' );
        }

        socket?.emit(
            'player-signed-in'
            , { playerUsername: gameSettings.userName }
        );
    };

    return (
        <>
            <Typography>
                Please Choose Your Username
            </Typography>
            <TextField
                InputProps={ { sx: { backgroundColor: 'white' } } }
                size='small'
                onChange={ e => setGameSettings( settings => ( {
                    ...settings
                    , userName: e.target.value
                } ) ) }
                value={ gameSettings.userName }
                error={ isDuplicateUsername }
                helperText={ isDuplicateUsername && 'Username already taken' }
            />
            <Typography>
                Please Choose Number of Players
            </Typography>
            <RadioGroup
                value={ numPlayers }
                onChange={
                    e => setGameSettings( settings => ( {
                        ...settings
                        , numPlayers: Number( e.target.value )
                    } ) )
                }
                row
            >
                <FormControlLabel
                    label='1 Player'
                    control={ <Radio value={ 1 } /> }
                />
                <FormControlLabel
                    label='2 Player'
                    control={ <Radio value={ 2 } /> }
                />
            </RadioGroup>
            <Button
                variant='contained'
                onClick={ continueToNext }
                disabled={ buttonDisabled }
            >
                Continue
            </Button>
        </>
    );
};

export default UserSignin;
