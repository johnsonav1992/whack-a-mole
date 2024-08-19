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

// Hooks
import {
    useGameSettings
    , useGameStep
} from '../../state/atoms';

const LevelSelection = () => {
    const [ gameSettings, setGameSettings ] = useGameSettings( 'norm' );
    const setGameStep = useGameStep( 'set' );

    const continueToGame = () => {
        setGameStep( 'start' );
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
