// Assets
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
            height={ 100 }
            width={ 100 }
            onClick={ () => hammerHit( moleIndex, isPopped ) }
            draggable={ false }
            style={ { userSelect: 'none' } }
        />
    );
};

export default Mole;
