import { Stack } from '@mui/material';
import Board from './components/Board/Board';

function App () {

    return (
        <Stack
            sx={ {
                width: '100%'
                , height: '100vh'
                , alignItems: 'center'
                , justifyContent: 'center'
            } }
        >
            <Board />
        </Stack>
    );
}

export default App;
