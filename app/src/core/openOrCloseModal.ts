import { getTargetElement } from "src/utils/getTargetElement";
import { addListenersToModalButton } from "./addListenersToModalButton";
import { getCoreElements } from "./getCoreElements";

export function openOrCloseModal(): void {
    const { addPresetButton, headerText } = getCoreElements();
    const overlay = getTargetElement('overlay-modal', document.getElementsByTagName('div'));

    if (!overlay || !addPresetButton || !headerText) return;

    headerText.innerText = 'New preset';

    overlay.classList.toggle('hidden');

    addPresetButton.innerText = 'Add preset';
    addPresetButton.classList.add('disabled');
    addListenersToModalButton();
}
