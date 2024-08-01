import {
    useEffect
    , useState
} from 'react';

// MUI
import { Typography } from '@mui/material';

// Components
import GameOver from './components/GameOver/GameOver';
import GameStart from './components/GameStart/GameStart';
import UserSignin from './components/UserSignin/UserSignin';
import WaitingRoom from './components/WaitingRoom/WaitingRoom';
import GameScreen from './components/GameScreen/GameScreen';
import ViewWrapper from './components/ViewWrapper/ViewWrapper';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useFont } from './hooks/useFont';

// Types
import {
    GameRoom
    , GameSettings
    , GameStep
} from './types/types';

// Assets
import whackAMoleFont from './assets/HelloWhackAMole.ttf';

// Utils
import { defaultGameSettings } from './utils/gameSettings';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameSettings, setGameSettings ] = useState<GameSettings>( defaultGameSettings );
    const [ gameStep, setGameStep ] = useState<GameStep>( 'players' );
    const [ rooms, setRooms ] = useState<GameRoom[]>( [
        {
            name: 'Veggies'
            , currentPlayers: [ 'aj', null ]
        }
        , {
            name: 'Fruits'
            , currentPlayers: [ 'aj', null ]
        }
    ] );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    const {
        remainingTime
        , setRemainingTime
    } = useTimer( { gameDuration: null } );

    const resetGame = ( gameStep?: GameStep ) => {
        if ( gameStep === 'players' ) {
            setRemainingTime( null );
            setGameSettings( defaultGameSettings );
        } else if ( gameSettings.gameLevel ) {
            setRemainingTime( gameSettings.gameLevel.gameDuration );
        }

        setScore( 0 );
        gameStep && setGameStep( gameStep );
    };

    useEffect( () => {
        if ( gameStep === 'active' && !remainingTime ) {
            setGameStep( 'finished' );
        }
    }, [ gameStep, remainingTime ] );

    const renderView = () => {
        switch ( gameStep ) {
            case 'players': return (
                <UserSignin
                    numPlayers={ gameSettings.numPlayers }
                    gameSettings={ gameSettings }
                    setGameSettings={ setGameSettings }
                    setGameStep={ setGameStep }
                    rooms={ rooms }
                />
            );
            case 'waiting': return (
                <WaitingRoom
                    rooms={ rooms }
                    setRooms={ setRooms }
                    gameSettings={ gameSettings }
                />
            );
            case 'start': return <GameStart resetGame={ resetGame } />;
            case 'finished': return (
                <GameOver
                    score={ score }
                    resetGame={ resetGame }
                />
            );
            case 'active': return (
                <GameScreen
                    gameSettings={ gameSettings }
                    remainingTime={ remainingTime }
                    score={ score }
                    setScore={ setScore }
                />
            );
        }
    };

    return (
        <ViewWrapper>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
            { renderView() }
        </ViewWrapper>
    );
}

export default App;
