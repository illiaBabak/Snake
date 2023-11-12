import { DEFAULT_PRESETS } from "src/variables/constants";
import { getCoreElements } from "./getCoreElements";
import { changePreset } from "./changePreset";
import { gameSettings } from "src/variables/variables";
import { getPresetsFromLocalStorage } from "./getPresetsFromLocalStorage";

export function addPresetsListeners(): void {
    const { listEls } = getCoreElements();
    if (!listEls) return;

    const data = getPresetsFromLocalStorage();
    const newPresets = [...DEFAULT_PRESETS, ...data];

    let { colorSnakeGame, colorMap, shouldShowSettings } = gameSettings;

    for (let i = 0; i < listEls.length; i++) {
        const { key, name, showSettings, colorSnake, fieldColor, colorPage, startImg, shadowColor, shouldMapFlip, shouldDirectionFlip, shouldChangeSpeed, shouldOpacity, shouldChangeColor, animationImg, speed, shouldObstacles, shouldTeleport, shouldAnimation, mapSize } = newPresets[i];

        listEls[i].addEventListener('click', () => {
            const {
                colorSnakeGame: updatedColorSnakeGame,
                colorMap: updatedColorMap,
                shouldShowSettings: updatedShouldShowSettings
            } = changePreset(
                { key, name, showSettings, colorSnake, fieldColor, colorPage, startImg, shadowColor, shouldMapFlip, shouldDirectionFlip, shouldChangeSpeed, shouldOpacity, shouldChangeColor, animationImg, speed, shouldObstacles, shouldTeleport, shouldAnimation, mapSize },
                colorSnakeGame,
                colorMap,
                shouldShowSettings,
            );

            colorSnakeGame = updatedColorSnakeGame;
            colorMap = updatedColorMap;
            shouldShowSettings = updatedShouldShowSettings;
        });
    }

}