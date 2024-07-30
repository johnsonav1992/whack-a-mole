import { GameRoom } from '../../types/types';
import RoomCard from '../RoomCard/RoomCard';

type Props = {
    rooms: GameRoom[];
};

const WaitingRoom = ( { rooms }: Props ) => {
    return (
        <>
            {
                rooms.map( room => (
                    <RoomCard
                        key={ room.name }
                        room={ room }
                    />
                ) )
            }
        </>
    );
};

export default WaitingRoom;
