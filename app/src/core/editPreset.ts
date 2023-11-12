import { getPresetsFromLocalStorage } from "./getPresetsFromLocalStorage";
import { getCoreElements } from "./getCoreElements";
import { getTargetElement } from "src/utils/getTargetElement";
import { addListenersToModalButton } from "./addListenersToModalButton";

export function editPreset(key: string): void {
    const errorMessage = getTargetElement('error-message', document.getElementsByTagName('div'));
    const { newSpeedText, newSpeedInput, newMapSize, shouldAnimation, shouldTeleport, shouldObstacles, animationImg, mapFlip, directionFlip, changeSpeed, changeOpacity, changeColor, overlayStart, panel, headerText, addPresetButton, presetText, showSettingsCheck, newColorField, newColorPage, newColorSnake, newColorShadow, newStartImg } = getCoreElements();
    if (!errorMessage || !newSpeedText || !newSpeedInput || !newMapSize || !shouldAnimation || !shouldTeleport || !shouldObstacles || !animationImg || !mapFlip || !directionFlip || !changeSpeed || !changeOpacity || !changeColor || !headerText || !panel || !overlayStart || !addPresetButton || !presetText || !showSettingsCheck || !newColorSnake || !newColorField || !newColorShadow || !newColorPage || !newStartImg) return;

    errorMessage.classList.add('hidden');
    addPresetButton.classList.remove('disabled');

    const data = getPresetsFromLocalStorage();
    const preset = data.find((obj) => obj.key === key);

    if (!preset) return;

    headerText.innerText = 'Edit preset';
    addPresetButton.innerText = 'Edit preset';

    presetText.value = preset.name;
    showSettingsCheck.checked = preset.showSettings;
    newColorSnake.value = preset.colorSnake;
    newColorField.value = preset.colorPage;
    newColorPage.value = preset.colorPage;
    newStartImg.value = preset.startImg;
    newColorShadow.value = preset.shadowColor;
    mapFlip.checked = preset.shouldMapFlip;
    directionFlip.checked = preset.shouldDirectionFlip;
    changeSpeed.checked = preset.shouldChangeSpeed;
    changeOpacity.checked = preset.shouldOpacity;
    changeColor.checked = preset.shouldChangeColor;
    newMapSize.value = preset.mapSize;
    shouldAnimation.checked = preset.shouldAnimation;
    shouldTeleport.checked = preset.shouldTeleport;
    shouldObstacles.checked = preset.shouldObstacles;
    animationImg.value = preset.animationImg;
    newSpeedInput.value = preset.speed;
    newSpeedText.innerText = preset.speed;

    sessionStorage.setItem('selectedPresetKey', key);

    addListenersToModalButton(key);
}
