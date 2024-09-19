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
    , useRooms
    , useSocketAtom
} from '../../state/atoms';
import { SyntheticEvent } from 'react';

const LevelSelection = () => {
    const socket = useSocketAtom( 'value' );
    const rooms = useRooms( 'value' );
    const [ gameSettings, setGameSettings ] = useGameSettings( 'norm' );
    const setGameStep = useGameStep( 'set' );

    const room = rooms.find( rm => rm.currentPlayers.includes( gameSettings.userName ) );

    const continueToGame = () => {
        socket?.emit( 'player-action', {
            playerName: gameSettings.userName
            , roomName: room?.name || ''
            , actionPayload: { 'startGame': true }
        } );
        // setGameStep( 'start' );
    };

    const emitLevelChange = ( e: SyntheticEvent<Element, Event> ) => {
        const level = ( e.target as HTMLInputElement ).value as keyof typeof GAME_LEVELS;

        socket?.emit( 'player-action', {
            playerName: gameSettings.userName
            , roomName: room?.name || ''
            , actionPayload: { levelSelected: level }
        } );
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
                            onChange={ emitLevelChange }
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
