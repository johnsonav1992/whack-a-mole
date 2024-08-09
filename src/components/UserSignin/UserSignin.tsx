import {
    Dispatch
    , SetStateAction
} from 'react';

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
import {
    GameRoom
    , GameSettings
    , GameStep
} from '../../types/types';
import { ClientToServerEvents } from '../../../backend/types/socketEventTypes';

// Utils
import { Socket } from 'socket.io-client';

type Props = {
    numPlayers: number;
    gameSettings: GameSettings;
    setGameSettings: Dispatch<SetStateAction<GameSettings>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
    rooms: GameRoom[];
    socket: Socket<ClientToServerEvents> | null;
};

const UserSignin = ( {
    numPlayers
    , gameSettings
    , setGameSettings
    , setGameStep
    , rooms
    , socket
}: Props ) => {
    const gameLevelOrUsernameNotSelected = !gameSettings.gameLevel || !gameSettings.userName;
    const isDuplicateUsername
        = rooms.some( room => room.currentPlayers.some( player => player === gameSettings.userName ) )
        && gameSettings.numPlayers === 2;

    const buttonDisabled = gameLevelOrUsernameNotSelected || isDuplicateUsername;

    const continueToGame = () => {
        socket?.emit(
            'player-signed-in'
            , { playerUsername: gameSettings.userName }
        );
        setGameStep( 'level' );
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
                onClick={ continueToGame }
                disabled={ buttonDisabled }
            >
                Continue
            </Button>
        </>
    );
};

export default UserSignin;
