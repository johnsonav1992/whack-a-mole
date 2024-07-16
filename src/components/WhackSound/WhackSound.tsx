import {
    ElementRef
    , LegacyRef
} from 'react';
import whack from '../../assets/whack.mp3';

export type Props = {
    audioRef: LegacyRef<ElementRef<'audio'>>;
};

const WhackSound = ( {
    audioRef
}: Props ) => {
    return (
        <audio ref={ audioRef }>
            <source
                src={ whack }
                type='audio/mpeg'
            />
        </audio>
    );
};

export default WhackSound;
