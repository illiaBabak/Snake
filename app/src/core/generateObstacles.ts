import { MAX_CHANCE } from "src/constants/constants";
import { getRandomInteger } from "src/utils/getRandomInteger";
import { makeRandomObstacles } from "./makeRandomObstacles";

export function generateObstacles(squares: HTMLDivElement[], score: number, rowLength: number): void {
    const minObstacleChance = score * 2 < MAX_CHANCE ? score * 2 : MAX_CHANCE;
    const obstacleChance = getRandomInteger(minObstacleChance, MAX_CHANCE);

    if (obstacleChance === MAX_CHANCE) {
        const obsctaclesCount = getRandomInteger(1, 3 + (Math.floor(score / 3) > 6 ? 6 : Math.floor(score / 3)));

        for (let i = 0; i < obsctaclesCount; i++) {
            makeRandomObstacles(squares, rowLength);
        }
    }
}