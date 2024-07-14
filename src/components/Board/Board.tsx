import { Card } from '@mui/material';
import { backgroundGreen } from '../../theme/theme';
import { Mole } from '../../types/types';
import hammer from '../../assets/hammer.png';
import hit from '../../assets/hammer-hit.png';
import { useState } from 'react';

const Board = () => {
    const moles = Array.from<{ length: number }, Mole>( { length: 16 }, ( _, i ) => ( {
        image: 'src/assets/mole-pop.png'
        , isPopped: i === 5 ?? false
    } ) );

    const [ cursor, setCursor ] = useState<'' | 'hit'>( '' );

    const hammerAnimate = () => {
        setCursor( 'hit' );
        setTimeout( () => setCursor( '' ), 50 );
    };

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
                // , cursor: `url('${ cursor === 'hit' ? hit : hammer }') 64 32, auto`
                , cursor: `url('${ cursor === 'hit' ? hit : hammer }') 64 32, auto`
            } }
        >
            {
                moles.map( ( mole, i ) => (
                    <img
                        src={ mole.isPopped ? mole.image.replace( 'pop', 'hole' ) : mole.image }
                        key={ i }
                        height={ 92 }
                        width={ 92 }
                        style={ {
                            margin: '.25rem'
                        } }
                        onClick={ () => hammerAnimate() }
                    />
                ) )
            }
        </Card>
    );
};

export default Board;
