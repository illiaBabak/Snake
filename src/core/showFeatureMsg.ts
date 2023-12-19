import { getCoreElements } from "./getCoreElements";

let lastTimeoutId: NodeJS.Timeout | null = null;

export function showFeatureMsg(text: string): void {
    const { featureMessage } = getCoreElements();
    if (!featureMessage) return;

    featureMessage.innerText += text;

    featureMessage.classList.remove('hidden');

    if (lastTimeoutId) clearTimeout(lastTimeoutId);

    lastTimeoutId = setTimeout(() => {
        featureMessage.classList.add('hidden');
        featureMessage.innerText = '';
    }, 1800);
}

