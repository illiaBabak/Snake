import { getTargetElement } from "src/utils/getTargetElement";

export function removeAlert(): void {
    const errorMessage = getTargetElement('error-message', document.getElementsByTagName('div'));
    if (!errorMessage) return;

    errorMessage.innerHTML = '';
    errorMessage.classList.add('hidden');
}
