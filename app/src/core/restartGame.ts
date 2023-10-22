import { getTargetElement } from "src/utils/getTargetElement";

export function restartGame(pauseButton: HTMLDivElement | undefined): boolean {
    const pauseDiv = getTargetElement('pause-div', document.getElementsByTagName('div'))

    if (pauseButton && pauseDiv) {
        pauseButton.innerText = 'Pause';
        pauseDiv.classList.add('hidden');
    }

    return false;
}