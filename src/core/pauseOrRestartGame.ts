import { getCoreElements } from "./getCoreElements";

const BORDER_WIDTH = 8;

export function pauseOrRestartGame(pauseButton: HTMLDivElement | undefined, isPaused: boolean): boolean {
    const { map, pauseDiv } = getCoreElements();
    if (!pauseButton || !pauseDiv || !map) return false;

    const mapWidth = map.offsetWidth - BORDER_WIDTH;
    const mapHeight = map.offsetHeight - BORDER_WIDTH;

    pauseButton.innerText = isPaused ? 'Pause' : 'Continue';
    pauseDiv.style.width = `${mapWidth}px`;
    pauseDiv.style.height = `${mapHeight}px`;
    pauseDiv.classList.toggle('hidden');


    return !isPaused;
}