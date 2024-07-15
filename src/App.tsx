import { Stack } from '@mui/material';
import Board from './components/Board/Board';
import { useState } from 'react';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

function App () {
    const [ score, setScore ] = useState( 0 );

    return (
        <Stack
            sx={ {
                width: '100%'
                , height: '100vh'
                , alignItems: 'center'
                , justifyContent: 'center'
            } }
        >
            <ScoreBoard score={ score } />
            <Board setScore={ setScore } />
        </Stack>
    );
}

export default App;
