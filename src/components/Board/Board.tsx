import { Card } from '@mui/material';
import { backgroundGreen } from '../../theme/theme';

const Board = () => {
    const moles = Array.from( { length: 16 }, () => 'src/assets/mole-pop.png' );

    return (
        <Card
            elevation={ 4 }
            sx={ {
                width: 400
                , display: 'flex'
                , flexWrap: 'wrap'
                , aspectRatio: 1
                , backgroundColor: backgroundGreen
                , padding: '.5rem'
            } }
        >
            {
                moles.map( ( img, i ) => (
                    <img
                        src={ img }
                        key={ i }
                        height={ 92 }
                        width={ 92 }
                        style={ {
                            margin: '.25rem'
                        } }
                    />
                ) )
            }
        </Card>
    );
};

export default Board;
