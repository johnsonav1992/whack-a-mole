import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./socketEventTypes";

export type WhackAMoleSocket = Socket<ClientToServerEvents, ServerToClientEvents>;