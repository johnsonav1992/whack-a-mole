import { WhackAMoleSocket } from "../types/types";

export const registerHandlers = <TSocket extends WhackAMoleSocket>(
    socket: TSocket
    , ...handlers: ((socket: TSocket) => void)[]
) => handlers.forEach(handler => handler(socket));