// MUI
import { Stack } from '@mui/material';

// Components
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Board from '../Board/Board';

// Types
import { UseSocketRegisterEvent } from '../../types/types';

// Hooks
import { useGameSettings } from '../../state/atoms';

type Props = {
    remainingTime: number | null;
    registerEvent: UseSocketRegisterEvent;
};

const GameScreen = ( {
    remainingTime
    , registerEvent
}: Props ) => {
    const gameSettings = useGameSettings( 'value' );

    registerEvent( 'player-action', e => {
        console.log( e );
    } );

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
