import { getTargetElement } from "src/utils/getTargetElement";

export function pauseOrRestartGame(pauseButton: HTMLDivElement | undefined, isPaused: boolean): boolean {
    const pauseDiv = getTargetElement('pause-div', document.getElementsByTagName('div'))

    if (pauseButton && pauseDiv) {
        pauseButton.innerText = isPaused ? 'Pause' : 'Continue';
        pauseDiv.classList.toggle('hidden');
    }

    return !isPaused;
}