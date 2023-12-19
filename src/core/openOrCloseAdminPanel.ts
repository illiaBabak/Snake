import { getCoreElements } from './getCoreElements';
import { createListPresets } from './createListPresets';
import { addListenersToModalButton } from './addListenersToModalButton';

export function openOrCloseAdminPanel(): void {
  const {
    lineAnimation,
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

  createListPresets(true);
  createListPresets();

  overlayStart.classList.toggle('hidden');
  panel.classList.toggle('hidden');

  lineAnimation.classList.add('disabled');

  headerText.innerText = 'New preset';
  addPresetButton.innerText = 'Add preset';

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

  addListenersToModalButton();
}
