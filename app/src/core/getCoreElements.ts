import { getTargetElement } from "src/utils/getTargetElement";
import { getTargetElements } from "src/utils/getTargetElements";

type ReturnValue = {
    overlayStart?: HTMLDivElement;
    tutorialOverlay?: HTMLDivElement;
    map?: HTMLDivElement;
    showTutorialButton?: HTMLDivElement;
    closeTutorialButton: Element;
    startButton?: HTMLDivElement;
    speedInput?: HTMLInputElement;
    speedText?: HTMLParagraphElement;
    colorSnakeInput?: HTMLInputElement;
    colorMapInput?: HTMLInputElement;
    sizeMap?: HTMLSelectElement;
    settings?: HTMLDivElement;
    pauseButton?: HTMLDivElement;
    obstaclesInput?: HTMLInputElement;
    teleportInput?: HTMLInputElement;
    listEls?: HTMLDivElement[]
}

export function getCoreElements(): ReturnValue {
    const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
    const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
    const map = getTargetElement('map', document.getElementsByTagName('div'));
    const settings = getTargetElement('settings', document.getElementsByTagName('div'));

    const showTutorialButton = getTargetElement('show-tutorial-button', document.getElementsByTagName('div'));
    const closeTutorialButton = document.getElementsByClassName('start-button')[0];
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));
    const speedText = getTargetElement('speed-p', document.getElementsByTagName('p'));
    const colorSnakeInput = getTargetElement('color-snake-input', document.getElementsByTagName('input'));
    const colorMapInput = getTargetElement('color-map-input', document.getElementsByTagName('input'));
    const sizeMap = getTargetElement('select-size', document.getElementsByTagName('select'));
    const pauseButton = getTargetElement('pause', document.getElementsByTagName('div'));
    const obstaclesInput = getTargetElement('obstacles-input', document.getElementsByTagName('input'));
    const teleportInput = getTargetElement('teleport-input', document.getElementsByTagName('input'));
    const listEls = getTargetElements('list-el', document.getElementsByTagName('div'));

    return { overlayStart, tutorialOverlay, map, showTutorialButton, closeTutorialButton, startButton, speedInput, speedText, colorSnakeInput, colorMapInput, sizeMap, settings, pauseButton, obstaclesInput, teleportInput, listEls };
}