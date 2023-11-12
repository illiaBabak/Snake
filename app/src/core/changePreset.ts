import { Preset } from "src/types/preset";
import { getTargetElement } from "src/utils/getTargetElement";
import { getCoreElements } from "./getCoreElements";
import { gameSettings } from "src/variables/variables";
import { createMap } from "./createMap";

export function changePreset({ shouldObstacles, shouldTeleport, speed, mapSize, animationImg, shouldAnimation, shouldDirectionFlip, shouldMapFlip, showSettings, colorSnake, fieldColor, colorPage, startImg, shadowColor }: Preset, colorSnakeGame: string, colorMap: string, shouldShowSettings: boolean): { colorSnakeGame: string, colorMap: string, shouldShowSettings: boolean } {
    const root = document.documentElement;
    const { teleportInput, obstaclesInput, speedInput, speedText, colorSnakeInput, settings, map, sizeMap, colorMapInput } = getCoreElements();

    const img = getTargetElement('start-img', document.getElementsByTagName('img'));
    if (img) img.setAttribute('src', startImg);

    root.style.setProperty('--color-snake', colorSnake);
    root.style.setProperty('--field-color', fieldColor);
    root.style.setProperty('--container-color', colorPage);
    root.style.setProperty('--shadow', shadowColor);

    colorSnakeGame = colorSnake;
    colorMap = fieldColor;
    shouldShowSettings = showSettings;
    gameSettings.isMapFlip = shouldMapFlip;
    gameSettings.isDirectionFlip = shouldDirectionFlip;
    gameSettings.mapSize = mapSize;
    gameSettings.colorSnakeGame = colorSnake;
    gameSettings.colorMap = fieldColor;
    gameSettings.newSpeed = speed;
    gameSettings.shouldUseObstacles = shouldObstacles;
    gameSettings.shouldUseTeleports = shouldTeleport;

    if (obstaclesInput) obstaclesInput.checked = gameSettings.shouldUseObstacles;

    if (teleportInput) teleportInput.checked = gameSettings.shouldUseTeleports;

    if (speedText && speedInput) {
        speedText.innerText = gameSettings.newSpeed;
        speedInput.value = gameSettings.newSpeed.toString();
    }

    if (colorMapInput) colorMapInput.value = gameSettings.colorMap;

    if (colorSnakeInput) colorSnakeInput.value = gameSettings.colorSnakeGame;

    if (map && sizeMap) {
        createMap(Number(gameSettings.mapSize), map);
        sizeMap.value = gameSettings.mapSize;
    }

    if (shouldAnimation) gameSettings.animationImg = animationImg;

    if (!shouldShowSettings && settings) settings.classList.add('hidden');

    return {
        colorSnakeGame,
        colorMap,
        shouldShowSettings,
    };
}