import { Preset } from "src/types/preset";
import { generateKey } from "src/utils/generateKey";
import { getCoreElements } from "./getCoreElements";

export function getPresetInfo(key?: string): Preset {
    const { newMapSize, shouldAnimation, shouldTeleport, shouldObstacles, animationImg, newSpeedInput, mapFlip, directionFlip, changeSpeed, changeOpacity, changeColor, presetText, showSettingsCheck, newColorField, newColorPage, newColorSnake, newColorShadow, newStartImg, } = getCoreElements();

    let newPreset = {
        key: '',
        name: '',
        showSettings: true,
        colorSnake: '',
        fieldColor: '',
        colorPage: '',
        startImg: '',
        shadowColor: '',
        shouldMapFlip: false,
        shouldDirectionFlip: false,
        shouldChangeSpeed: false,
        shouldOpacity: false,
        shouldChangeColor: false,
        animationImg: '',
        speed: '',
        shouldObstacles: false,
        shouldTeleport: false,
        shouldAnimation: false,
        mapSize: '',
    };

    if (newMapSize && shouldAnimation && shouldTeleport && shouldObstacles && animationImg && newSpeedInput && mapFlip && directionFlip && changeSpeed && changeOpacity && changeColor && presetText && showSettingsCheck && newColorSnake && newColorField && newColorShadow && newColorPage && newStartImg) {
        newPreset = {
            key: key ? key : generateKey(16),
            name: presetText.value,
            showSettings: showSettingsCheck.checked,
            colorSnake: newColorSnake.value,
            fieldColor: newColorField.value,
            colorPage: newColorPage.value,
            startImg: newStartImg.value,
            shadowColor: newColorShadow.value,
            shouldMapFlip: mapFlip.checked,
            shouldDirectionFlip: directionFlip.checked,
            shouldChangeSpeed: changeSpeed.checked,
            shouldOpacity: changeOpacity.checked,
            shouldChangeColor: changeColor.checked,
            animationImg: animationImg.value,
            speed: newSpeedInput.value,
            shouldObstacles: shouldObstacles.checked,
            shouldTeleport: shouldTeleport.checked,
            shouldAnimation: shouldAnimation.checked,
            mapSize: newMapSize.value,
        };

        presetText.value = '';
        showSettingsCheck.checked = false;
        newColorSnake.value = '';
        newColorField.value = '';
        newColorPage.value = '';
        newStartImg.value = '';
        newColorShadow.value = '';
        mapFlip.checked = false;
        directionFlip.checked = false;
        changeSpeed.checked = false;
        changeOpacity.checked = false;
        changeColor.checked = false;
        newMapSize.value = '40';
        shouldAnimation.checked = false;
        shouldTeleport.checked = false;
        shouldObstacles.checked = false;
        animationImg.value = '';
        newSpeedInput.value = '4';
    }

    return newPreset;
}