// Components
import {
    Button
    , Typography
} from '@mui/material';
import ViewWrapper from '../ViewWrapper/ViewWrapper';

type Props = {
    resetGame: () => void;
};

const GameStart = ( { resetGame }: Props ) => {
    return (
        <ViewWrapper sx={ { gap: '2rem' } }>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
            <Button
                variant='contained'
                onClick={ () => resetGame() }
                size='large'
            >
                Lets Play!
            </Button>
        </ViewWrapper>
    );
};

export default GameStart;
