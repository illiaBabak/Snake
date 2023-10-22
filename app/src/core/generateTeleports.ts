import { MAX_CHANCE } from "src/constants/constants";
import { getRandomInteger } from "src/utils/getRandomInteger";
import { makeRandomTeleport } from "./makeRandomTeleport";

export function generateTeleports(squares: HTMLDivElement[], score: number, rowLength: number): void {
    const minTeleportChance = score * 2 < MAX_CHANCE ? score * 2 : MAX_CHANCE;
    const teleportChance = getRandomInteger(minTeleportChance, MAX_CHANCE);

    if (teleportChance === MAX_CHANCE) makeRandomTeleport(squares, rowLength);
}