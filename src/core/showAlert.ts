import { getCoreElements } from "./getCoreElements";

export function showAlert(message: string): void {
    const { errorMessage } = getCoreElements();
    if (!errorMessage) return;

    errorMessage.innerHTML = '';
    errorMessage.classList.remove('hidden');

    const text = document.createElement('p');
    text.innerText = message;
    errorMessage.appendChild(text);
}