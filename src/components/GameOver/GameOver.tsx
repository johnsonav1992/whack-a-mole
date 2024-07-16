// MUI
import {
    Button
    , Typography
} from '@mui/material';

// Components
import ViewWrapper from '../ViewWrapper/ViewWrapper';

type Props = {
    score: number;
    resetGame: () => void;
};

const GameOver = ( {
    score
    , resetGame
}: Props ) => {
    return (
        <ViewWrapper>
            <Typography
                variant='h1'
                fontFamily='Whack-A-Mole'
            >
                Game Over!
            </Typography>
            <Typography variant='h3'>
                Score: { score }
            </Typography>
            <Button
                variant='contained'
                onClick={ () => resetGame() }
                size='large'
            >
                Play Again!
            </Button>
        </ViewWrapper>
    );
};

export default GameOver;
