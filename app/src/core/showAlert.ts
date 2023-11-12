import { getTargetElement } from "src/utils/getTargetElement";

export function showAlert(message: string): void {
    const errorMessage = getTargetElement('error-message', document.getElementsByTagName('div'));
    if (!errorMessage) return;

    errorMessage.innerHTML = '';
    errorMessage.classList.remove('hidden');

    const text = document.createElement('p');
    text.innerText = message;
    errorMessage.appendChild(text);
}