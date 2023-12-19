import { Preset } from 'src/types/preset';
import { generateKey } from 'src/utils/generateKey';
import { getCoreElements } from './getCoreElements';

export function getPresetInfo(key?: string): Preset {
  const {
    newMapSize,
    shouldAnimationInput,
    shouldTeleportInput,
    shouldObstaclesInput,
    animationImgInput,
    newSpeedInput,
    mapFlip,
    directionFlip,
    changeSpeed,
    changeOpacity,
    changeColor,
    presetText,
    showSettingsCheck,
    newColorField,
    newColorPage,
    newColorSnake,
    newColorShadow,
    newStartImg,
  } = getCoreElements();

  let newPreset = {
    key: '',
    name: '',
    shouldShowSettings: true,
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

  if (
    newMapSize &&
    shouldAnimationInput &&
    shouldTeleportInput &&
    shouldObstaclesInput &&
    animationImgInput &&
    newSpeedInput &&
    mapFlip &&
    directionFlip &&
    changeSpeed &&
    changeOpacity &&
    changeColor &&
    presetText &&
    showSettingsCheck &&
    newColorSnake &&
    newColorField &&
    newColorShadow &&
    newColorPage &&
    newStartImg
  ) {
    newPreset = {
      key: key ? key : generateKey(16),
      name: presetText.value,
      shouldShowSettings: showSettingsCheck.checked,
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
      animationImg: animationImgInput.value,
      speed: newSpeedInput.value,
      shouldObstacles: shouldObstaclesInput.checked,
      shouldTeleport: shouldTeleportInput.checked,
      shouldAnimation: shouldAnimationInput.checked,
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
    shouldAnimationInput.checked = false;
    shouldTeleportInput.checked = false;
    shouldObstaclesInput.checked = false;
    animationImgInput.value = '';
    newSpeedInput.value = '4';
  }

  return newPreset;
}
