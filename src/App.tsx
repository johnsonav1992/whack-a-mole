import {
    useEffect
    , useState
} from 'react';

// MUI
import {
    Alert
    , Snackbar
    , Typography
} from '@mui/material';

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
import { useLatest } from './hooks/useLatest.ts';

// Types
import { GameStep } from './types/types';
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

// Hooks
import {
    useGameSettings
    , useGameStep
    , useRooms
    , useScore
    , useSignedInPlayers
    , useSocketAtom
} from './state/atoms.ts';

function App () {
    const setScore = useScore( 'set' );
    const [ storedSocket, setStoredSocket ] = useSocketAtom( 'norm' );
    const [ gameSettings, setGameSettings ] = useGameSettings( 'norm' );
    const [ gameStep, setGameStep ] = useGameStep( 'norm' );
    const [ rooms, setRooms ] = useRooms( 'norm' );
    const [ signedInPlayers, setSignedInPlayers ] = useSignedInPlayers( 'norm' );

    const [ connectErrorShow, setConnectErrorShow ] = useState( true );

    const currRooms = useLatest( rooms );
    const currGameSettings = useLatest( gameSettings );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    const {
        socket
        , registerEvent
        , connectError
    } = useSocket<
        ServerToClientEvents
        , ClientToServerEvents
    >( {
        listenEvents: {
            'load-current-players': e => setSignedInPlayers( e.currentPlayers )
            , 'load-current-rooms': e => setRooms( e.currentRooms )
            , 'player-signed-in': e => {
                setSignedInPlayers( players => [ ...players, e.playerUsername ] );
            }
            , 'join-room': e => playerJoin( e, setRooms )
            , 'leave-room': e => playerLeave( e.userName, setRooms )
            , 'user-leave': e => {
                setSignedInPlayers( players => players.filter( player => player !== e.userName ) );
            }
            , 'level-select-initiated': e => {
                const usersCurrentRoom = currRooms.current.find(
                    rm => rm.currentPlayers.includes( currGameSettings.current.userName )
                );

                if ( e.roomName === usersCurrentRoom?.name ) {
                    setGameStep( 'level' );
                }
            }
        }
    } );

    if ( socket && !storedSocket ) {
        setStoredSocket( socket );
    }

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
            case 'players': return <UserSignin numPlayers={ gameSettings.numPlayers } />;
            case 'level': return <LevelSelection />;
            case 'waiting': return <WaitingRoom socket={ socket } />;
            case 'start': return <GameStart resetGame={ resetGame } />;
            case 'finished': return <GameOver resetGame={ resetGame } />;
            case 'active': return (
                <GameScreen
                    remainingTime={ remainingTime }
                    registerEvent={ registerEvent }
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
            <Snackbar
                open={ !!( connectError && connectErrorShow ) }
                autoHideDuration={ 2000 }
                anchorOrigin={ {
                    vertical: 'bottom'
                    , horizontal: 'center'
                } }
            >
                <Alert
                    severity='error'
                    variant='filled'
                    sx={ { width: '100%' } }
                    onClose={ () => setConnectErrorShow( false ) }
                >
                    There was an error connecting to the server
                </Alert>
            </Snackbar>
        </ViewWrapper>
    );
}

export default App;
