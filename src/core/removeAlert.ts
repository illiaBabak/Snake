import { getCoreElements } from "./getCoreElements";

export function removeAlert(): void {
    const { errorMessage } = getCoreElements();
    if (!errorMessage) return;

    errorMessage.innerHTML = '';
    errorMessage.classList.add('hidden');
}
