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
    , Typography
    , capitalize
} from '@mui/material';

// Utils
import { GAME_LEVELS } from '../../utils/gameLevels';

// Types
import {
    GameSettings
    , GameStep
} from '../../types/types';

type Props = {
    gameSettings: GameSettings;
    setGameSettings: Dispatch<SetStateAction<GameSettings>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
};

const LevelSelection = ( {
    gameSettings
    , setGameSettings
    , setGameStep
}: Props ) => {

    const continueToGame = () => {
        if ( gameSettings.numPlayers === 2 ) {
            setGameStep( 'waiting' );
        } else {
            setGameStep( 'start' );
        }
    };

    return (
        <>
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
                onClick={ continueToGame }
            >
                Continue
            </Button>
        </>
    );
};

export default LevelSelection;
