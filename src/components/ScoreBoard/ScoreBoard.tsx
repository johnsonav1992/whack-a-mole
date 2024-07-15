import {
    Paper
    , Typography
} from '@mui/material';
import { useState } from 'react';

export type Props = {
    score: number;
};

const ScoreBoard = ( { score }: Props ) => {
    const [ timer, setTimer ] = useState( 0 );
    return (
        <Paper
            sx={ {
                p: '1rem'
                , mb: '1rem'
            } }
        >
            <Typography variant='h3'>
                Score: &nbsp;
                { score }
            </Typography>
        </Paper>
    );
};

export default ScoreBoard;
