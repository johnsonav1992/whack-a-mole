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
import LevelSelection from './components/LevelSelection/LevelSelection.tsx';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useFont } from './hooks/useFont';
import { useSocket } from './hooks/useSocket';

// Types
import {
    GameRoom
    , GameSettings
    , GameStep
} from './types/types';
import {
    ClientToServerEvents
    , ServerToClientEvents
} from '../backend/types/socketEventTypes.ts';

// Assets
import whackAMoleFont from './assets/HelloWhackAMole.ttf';

// Utils
import { defaultGameSettings } from './utils/gameSettings';
import {
    playerJoin
    , playerLeave
} from './utils/utils.ts';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameSettings, setGameSettings ] = useState<GameSettings>( defaultGameSettings );
    const [ gameStep, setGameStep ] = useState<GameStep>( 'players' );
    const [ rooms, setRooms ] = useState<GameRoom[]>( [] );
    const [ signedInPlayers, setSignedInPlayers ] = useState<string[]>( [] );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    const { socket } = useSocket<
        ServerToClientEvents
        , ClientToServerEvents
    >( {
        listenEvents: {
            'load-current-players': e => {
                setSignedInPlayers( e.currentPlayers );
            }
            , 'load-current-rooms': e => {
                setRooms( e.currentRooms );
            }
            , 'player-signed-in': e => {
                setSignedInPlayers( players => [ ...players, e.playerUsername ] );
            }
            , 'join-room': e => playerJoin( e, setRooms )
            , 'leave-room': e => {
                console.log( e );
                playerLeave( e.userName, setRooms );
            }
            , 'user-leave': e => {
                setSignedInPlayers( players => players.filter( player => player !== e.userName ) );
            }
        }
    } );

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
                    socket={ socket }
                />
            );
            case 'level': return (
                <LevelSelection
                    gameSettings={ gameSettings }
                    setGameSettings={ setGameSettings }
                    setGameStep={ setGameStep }
                />
            );
            case 'waiting': return (
                <WaitingRoom
                    rooms={ rooms }
                    setRooms={ setRooms }
                    gameSettings={ gameSettings }
                    setGameStep={ setGameStep }
                    socket={ socket }
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
            {
                gameStep !== 'finished'
                && (
                    <Typography
                        fontFamily='Whack-A-Mole'
                        variant='h1'
                    >
                        Whack-A-Mole!
                    </Typography>
                )
            }
            <Typography
                variant='body2'
                sx={ {
                    position: 'absolute'
                    , top: 0
                    , right: 0
                    , m: '1rem'
                } }
            >
                { `Currently Signed-In Players: ${ signedInPlayers.length }` }
            </Typography>
            { renderView() }
        </ViewWrapper>
    );
}

export default App;
