export type Mole = {
    image: `${ string }mole-${ 'hole' | 'pop' }.png`;
    isPopped: boolean;
};

export type GameLevel = {
    level: 'child' | 'easy' | 'medium' | 'hard';
    /**
     * How long is a single mole popped up
     */
    moleUpTime: number;
    /**
     * frequency between new moles popping up
     */
    moleUpFrequency: number;
};
