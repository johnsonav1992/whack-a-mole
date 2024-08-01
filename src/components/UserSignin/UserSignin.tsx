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
    , capitalize
} from '@mui/material';

// Types
import {
    GameRoom
    , GameSettings
    , GameStep
} from '../../types/types';

// Utils
import { GAME_LEVELS } from '../../utils/gameLevels';

type Props = {
    numPlayers: number;
    gameSettings: GameSettings;
    setGameSettings: Dispatch<SetStateAction<GameSettings>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
    rooms: GameRoom[];
};

const UserSignin = ( {
    numPlayers
    , gameSettings
    , setGameSettings
    , setGameStep
    , rooms
}: Props ) => {
    const gameLevelOrUsernameNotSelected = !gameSettings.gameLevel && !gameSettings.userName;
    const isDuplicateUsername
        = rooms.some( room => room.currentPlayers.some( player => player === gameSettings.userName ) )
        && gameSettings.numPlayers === 2;

    const buttonDisabled = gameLevelOrUsernameNotSelected || isDuplicateUsername;

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
            <Typography>
                Please Choose Difficulty Level
            </Typography>
            <RadioGroup
                value={ gameSettings.gameLevel?.level }
                onChange={
                    e => setGameSettings( settings => ( {
                        ...settings
                        , gameLevel: GAME_LEVELS[ e.target.value as keyof typeof GAME_LEVELS ]
                    } ) )
                }
            >
                {
                    Object.entries( GAME_LEVELS ).map( ( [ levelName ] ) => (
                        <FormControlLabel
                            key={ levelName }
                            label={ capitalize( levelName ) }
                            control={ <Radio value={ levelName } /> }
                        />
                    ) )
                }
            </RadioGroup>
            <Button
                variant='contained'
                onClick={ () => setGameStep(
                    gameSettings.numPlayers === 2
                        ? 'waiting'
                        : 'start'
                ) }
                disabled={ buttonDisabled }
            >
                Continue
            </Button>
        </>
    );
};

export default UserSignin;
