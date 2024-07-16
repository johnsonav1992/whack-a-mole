export const getRandomTimeWithinRange = ( baseMs: number, upper: number, lower: number ) => {
    const lowerBound = baseMs - lower;
    const upperBound = baseMs + upper;

    const randomMs = Math.floor( Math.random() * ( upperBound - lowerBound + 1 ) ) + lowerBound;

    return randomMs;
};
