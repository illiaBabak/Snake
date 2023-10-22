import { getTargetElement } from "src/utils/getTargetElement";

export function pauseGame(pauseButton: HTMLDivElement | undefined): boolean {
    const pauseDiv = getTargetElement('pause-div', document.getElementsByTagName('div'))

    if (pauseButton && pauseDiv) {
        pauseButton.innerText = 'Continue';
        pauseDiv.classList.remove('hidden');
    }

    return true;
}