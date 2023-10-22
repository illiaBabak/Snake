import { closeTutorial } from "./closeTutorial";
import { createMap } from "./createMap";
import { getCoreElements } from "./getCoreElements";
import { showTutorial } from "./showTutorial";

export function addEventListeners(currentSnake: number[], isSettings: boolean): void {
    const { showTutorialButton, overlayStart, tutorialOverlay, map, sizeMap, closeTutorialButton } = getCoreElements();
    if (!showTutorialButton || !overlayStart || !tutorialOverlay || !map || !sizeMap || !closeTutorialButton) return;

    showTutorialButton.addEventListener('click', () => showTutorial(overlayStart, tutorialOverlay, map));
    closeTutorialButton.addEventListener('click', () => closeTutorial(currentSnake, isSettings));

    createMap(40, map);
}

