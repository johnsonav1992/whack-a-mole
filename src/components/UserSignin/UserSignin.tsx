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

// Components
import ViewWrapper from '../ViewWrapper/ViewWrapper';

// Types
import {
    GameSettings
    , GameStep
} from '../../types/types';

// Utils
import { GAME_LEVELS } from '../../utils/gameLevels';

type Props = {
    numPlayers: number;
    gameSettings: GameSettings;
    setGameSettings: Dispatch<SetStateAction<GameSettings>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
};

const UserSignin = ( {
    numPlayers
    , gameSettings
    , setGameSettings
    , setGameStep
}: Props ) => {
    const buttonDisabled = !gameSettings.gameLevel && !gameSettings.userName;

    return (
        <ViewWrapper>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
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
                onClick={ () => setGameStep( 'start' ) }
                disabled={ buttonDisabled }
            >
                Continue
            </Button>
        </ViewWrapper>
    );
};

export default UserSignin;
