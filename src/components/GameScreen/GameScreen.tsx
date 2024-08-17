// MUI
import { Stack } from '@mui/material';

// Components
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Board from '../Board/Board';

// Types
import {
    GameSettings
    , UseSocketRegisterEvent
} from '../../types/types';

type Props = {
    remainingTime: number | null;
    gameSettings: GameSettings;
    registerEvent: UseSocketRegisterEvent;
};

const GameScreen = ( {
    remainingTime
    , gameSettings
    , registerEvent
}: Props ) => {

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
