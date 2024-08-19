// MUI
import { Stack } from '@mui/material';

// Components
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Board from '../Board/Board';

// Types
import { UseSocketRegisterEvent } from '../../types/types';

// Hooks
import {
    useGameSettings
    , useSocketAtom
} from '../../state/atoms';

type Props = {
    remainingTime: number | null;
    registerEvent: UseSocketRegisterEvent;
};

const GameScreen = ( {
    remainingTime
    , registerEvent
}: Props ) => {
    const socket = useSocketAtom( 'value' );
    const gameSettings = useGameSettings( 'value' );

    if ( !socket?.listeners( 'player-action' ).length ) {
        registerEvent( 'player-action', e => {
            console.log( e );
        } );
    }

    return (
        remainingTime
        && gameSettings.gameLevel
        && (
            <>
                <Stack>
                    <ScoreBoard remainingTime={ remainingTime } />
                    <Board
                        remainingTime={ remainingTime }
                        gameLevel={ gameSettings.gameLevel }
                    />
                </Stack>
            </>
        )
    );
};

export default GameScreen;
