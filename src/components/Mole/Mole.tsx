import mole from '../../assets/mole-pop.png';
import hole from '../../assets/mole-hole.png';

type Props = {
    moleIndex: number;
    isPopped: boolean;
    hammerHit: ( idx: number, isPopped: boolean ) => void;
};

const Mole = ( {
    isPopped
    , moleIndex
    , hammerHit
}: Props ) => {
    return (
        <img
            src={ isPopped ? mole : hole }
            height={ 92 }
            width={ 92 }
            style={ {
                margin: '.25rem'
            } }
            onClick={ () => hammerHit( moleIndex, isPopped ) }
        />
    );
};

export default Mole;
