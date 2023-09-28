import { getTargetElement } from "src/utils/getTargetElement";
import { getTargetElements } from "src/utils/getTargetElements";

export function closeTutorial(currentSnake: number[]): void {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));

    if (!squares) return;

    const scoreDiv = getTargetElement('score-div', document.getElementsByTagName('div'));
    scoreDiv?.classList.remove('hidden');

    const settings = getTargetElement('settings', document.getElementsByTagName('div'));
    settings?.classList.remove('hidden');

    const container = getTargetElement('container', document.getElementsByTagName('div'));
    container?.classList.add('row');

    const tutorialOverlay = document.getElementsByClassName('tutorial-overlay')[0];
    tutorialOverlay.classList.add('hidden');

    currentSnake.forEach((index) => {
        if (index >= 0 && index < squares.length) {
            squares[index].classList.add('snake');
        }
    });
}