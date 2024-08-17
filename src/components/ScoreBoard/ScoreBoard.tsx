// MUI
import {
    Paper
    , Typography
} from '@mui/material';
import { useScore } from '../../state/atoms';

type Props = {
    remainingTime: number;
};

const ScoreBoard = ( { remainingTime }: Props ) => {
    const score = useScore( 'value' );

    return (
        <Paper
            sx={ {
                p: '1rem'
                , mb: '1rem'
                , display: 'flex'
                , justifyContent: 'space-between'
                , gap: '1rem'
                , width: 500
                , backgroundColor: theme => theme.palette.grey[ 300 ]
            } }
        >
            <Typography variant='h5'>
                Time Remaining: &nbsp;
                { remainingTime }
            </Typography>
            <Typography variant='h5'>
                Score: &nbsp;
                { score }
            </Typography>
        </Paper>
    );
};

export default ScoreBoard;
