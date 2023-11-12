import { gameSettings } from "src/variables/variables";
import { closeTutorial } from "./closeTutorial";
import { getCoreElements } from "./getCoreElements";
import { showTutorial } from "./showTutorial";
import { createMap } from "./createMap";

export function addEventListeners(currentSnake: number[]): void {
    const { showTutorialButton, overlayStart, tutorialOverlay, map, sizeMap, closeTutorialButton, setAnimation } = getCoreElements();
    if (!showTutorialButton || !overlayStart || !tutorialOverlay || !map || !sizeMap || !closeTutorialButton || !setAnimation) return;

    showTutorialButton.addEventListener('click', () => showTutorial(overlayStart, tutorialOverlay));
    closeTutorialButton.addEventListener('click', () => closeTutorial(currentSnake, tutorialOverlay, map));

    createMap(Number(gameSettings.mapSize), map);
}

