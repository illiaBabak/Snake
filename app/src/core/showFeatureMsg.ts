import { getCoreElements } from "./getCoreElements";

export function showFeatureMsg(isDirectionFlip: boolean, shouldOpacityChange: boolean, shouldSpeedChange: boolean, score: number): void {
    const { featureMessage } = getCoreElements();
    if (!featureMessage || (!isDirectionFlip && !shouldOpacityChange && !shouldSpeedChange)) return;

    if (isDirectionFlip) featureMessage.innerText += 'Change of direction!\n';
    if (shouldOpacityChange) featureMessage.innerText += 'Change of opacity!\n';
    if (shouldSpeedChange && score % 3 === 0) featureMessage.innerText += 'Speed 2x!\n';

    if (featureMessage.innerText !== '') featureMessage.classList.remove('hidden');

    setTimeout(() => {
        featureMessage.classList.add('hidden');
        featureMessage.innerText = '';
    }, 1800);
}