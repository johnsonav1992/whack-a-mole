import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./socketEventTypes";

export type WhackAMoleSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export type Players = [string | null, string | null];
export type GameRoom = {
    name: string;
    currentPlayers: Players;
};