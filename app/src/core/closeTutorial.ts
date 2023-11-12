import { getTargetElement } from "src/utils/getTargetElement";
import { getTargetElements } from "src/utils/getTargetElements";

export function closeTutorial(currentSnake: number[], tutorialOverlay: HTMLDivElement, map: HTMLDivElement): void {
    const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
    const scoreDiv = getTargetElement('score-div', document.getElementsByTagName('div'));
    const containerSettings = getTargetElement('container-settings', document.getElementsByTagName('div'));
    const container = getTargetElement('container', document.getElementsByTagName('div'));

    if (!squares || !scoreDiv || !containerSettings || !container) return;

    scoreDiv.classList.remove('hidden');
    containerSettings.classList.remove('hidden');
    map.classList.remove('hidden');
    container.classList.add('row');
    tutorialOverlay.classList.add('hidden');

    currentSnake.forEach((index) => {
        if (index >= 0 && index < squares.length) {
            squares[index].classList.add('snake');
        }
    });
}