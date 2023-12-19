import { Preset } from 'src/types/preset';
import { getCoreElements } from './getCoreElements';
import { gameSettings } from 'src/variables/gameSettings';
import { createMap } from './createMap';
import { KeyOfPreset } from 'src/types/generalTypes';

export function changePreset(preset: Preset): void {
  const root = document.documentElement;
  const {
    teleportInput,
    obstaclesInput,
    speedInput,
    speedText,
    colorSnakeInput,
    settings,
    map,
    sizeMap,
    colorMapInput,
    startImgDiv,
  } = getCoreElements();

  const {
    startImg,
    colorSnake,
    fieldColor,
    colorPage,
    shadowColor,
    shouldObstacles,
    shouldTeleport,
    speed,
    shouldShowSettings,
    mapSize,
  } = preset;

  if (
    !startImgDiv ||
    !obstaclesInput ||
    !teleportInput ||
    !speedInput ||
    !speedText ||
    !colorSnakeInput ||
    !colorMapInput ||
    !sizeMap ||
    !settings ||
    !map
  )
    return;

  startImgDiv.setAttribute('src', startImg);

  root.style.setProperty('--color-snake', colorSnake);
  root.style.setProperty('--field-color', fieldColor);
  root.style.setProperty('--container-color', colorPage);
  root.style.setProperty('--shadow', shadowColor);

  const presetKeys = Object.keys(preset) as KeyOfPreset[];
  const parsedGameSettings = gameSettings as Record<string, boolean | string>;
  presetKeys.forEach((key) => {
    parsedGameSettings[key] = preset[key];
  });

  obstaclesInput.checked = shouldObstacles;
  teleportInput.checked = shouldTeleport;

  speedText.innerText = speed;
  speedInput.value = speed.toString();

  colorMapInput.value = fieldColor;
  colorSnakeInput.value = colorSnake;

  createMap(Number(mapSize), map);
  sizeMap.value = mapSize;

  if (!shouldShowSettings) settings.classList.add('hidden');
}
