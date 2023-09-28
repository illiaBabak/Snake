import { getTargetElement } from "src/utils/getTargetElement";

type ReturnValue = {
    overlayStart?: HTMLDivElement;
    tutorialOverlay?: HTMLDivElement;
    main?: HTMLDivElement;
    showTutorialButton: Element;
    closeTutorialButton: Element;
    startButton?: HTMLDivElement;
    speedInput?: HTMLInputElement;
    speedText?: HTMLParagraphElement;
    colorSnakeInput?: HTMLInputElement;
    colorMainInput?: HTMLInputElement;
    sizeMain?: HTMLSelectElement;
}

export function getCoreElements(): ReturnValue {
    const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
    const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
    const main = getTargetElement('main', document.getElementsByTagName('div'));

    const showTutorialButton = document.getElementsByClassName('show-tutorial-button')[0];
    const closeTutorialButton = document.getElementsByClassName('start-button')[0];
    const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
    const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));
    const speedText = getTargetElement('speed-p', document.getElementsByTagName('p'));
    const colorSnakeInput = getTargetElement('color-snake-input', document.getElementsByTagName('input'));
    const colorMainInput = getTargetElement('color-main-input', document.getElementsByTagName('input'));
    const sizeMain = getTargetElement('select-size', document.getElementsByTagName('select'));

    return { overlayStart, tutorialOverlay, main, showTutorialButton, closeTutorialButton, startButton, speedInput, speedText, colorSnakeInput, colorMainInput, sizeMain };
}