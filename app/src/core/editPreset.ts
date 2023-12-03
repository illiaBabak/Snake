import { getPresetsFromLocalStorage } from './getPresetsFromLocalStorage';
import { getCoreElements } from './getCoreElements';
import { addListenersToModalButton } from './addListenersToModalButton';

export function editPreset(key: string): void {
  const {
    lineAnimation,
    errorMessage,
    newSpeedText,
    newSpeedInput,
    newMapSize,
    shouldAnimationInput,
    shouldTeleportInput,
    shouldObstaclesInput,
    animationImgInput,
    mapFlip,
    directionFlip,
    changeSpeed,
    changeOpacity,
    changeColor,
    overlayStart,
    panel,
    headerText,
    addPresetButton,
    presetText,
    showSettingsCheck,
    newColorField,
    newColorPage,
    newColorSnake,
    newColorShadow,
    newStartImg,
  } = getCoreElements();

  if (
    !lineAnimation ||
    !errorMessage ||
    !newSpeedText ||
    !newSpeedInput ||
    !newMapSize ||
    !shouldAnimationInput ||
    !shouldTeleportInput ||
    !shouldObstaclesInput ||
    !animationImgInput ||
    !mapFlip ||
    !directionFlip ||
    !changeSpeed ||
    !changeOpacity ||
    !changeColor ||
    !headerText ||
    !panel ||
    !overlayStart ||
    !addPresetButton ||
    !presetText ||
    !showSettingsCheck ||
    !newColorSnake ||
    !newColorField ||
    !newColorShadow ||
    !newColorPage ||
    !newStartImg
  )
    return;

  errorMessage.classList.add('hidden');
  addPresetButton.classList.remove('disabled');

  const data = getPresetsFromLocalStorage();
  const preset = data.find((obj) => obj.key === key);
  if (!preset) return;

  const {
    name,
    shouldShowSettings,
    colorSnake,
    colorPage,
    startImg,
    shadowColor,
    shouldMapFlip,
    shouldDirectionFlip,
    shouldChangeSpeed,
    shouldOpacity,
    shouldChangeColor,
    mapSize,
    shouldAnimation,
    shouldTeleport,
    shouldObstacles,
    animationImg,
    speed,
  } = preset;

  headerText.innerText = 'Edit preset';
  addPresetButton.innerText = 'Edit preset';

  presetText.value = name;
  showSettingsCheck.checked = shouldShowSettings;
  newColorSnake.value = colorSnake;
  newColorField.value = colorPage;
  newColorPage.value = colorPage;
  newStartImg.value = startImg;
  newColorShadow.value = shadowColor;
  mapFlip.checked = shouldMapFlip;
  directionFlip.checked = shouldDirectionFlip;
  changeSpeed.checked = shouldChangeSpeed;
  changeOpacity.checked = shouldOpacity;
  changeColor.checked = shouldChangeColor;
  newMapSize.value = mapSize;
  shouldAnimationInput.checked = shouldAnimation;
  shouldTeleportInput.checked = shouldTeleport;
  shouldObstaclesInput.checked = shouldObstacles;
  animationImgInput.value = animationImg;
  newSpeedInput.value = speed;
  newSpeedText.innerText = speed;

  if (animationImg) lineAnimation.classList.remove('disabled');
  else lineAnimation.classList.add('disabled');

  sessionStorage.setItem('selectedPresetKey', key);

  addListenersToModalButton(key);
}
