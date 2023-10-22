import { Preset } from "src/types/Preset";
import { getTargetElement } from "src/utils/getTargetElement";

export function changePreset({ showSettings, colorSnake, fieldColor, colorPage, startImg, shadowColor }: Preset, colorSnakeGame: string, colorMap: string, isSettings: boolean): { colorSnakeGame: string, colorMap: string, isSettings: boolean } {
    const root = document.documentElement;

    const img = getTargetElement('start-img', document.getElementsByTagName('img'));
    if (img) img.setAttribute('src', startImg);

    root.style.setProperty('--color-snake', colorSnake);
    root.style.setProperty('--field-color', fieldColor);
    root.style.setProperty('--container-color', colorPage);
    root.style.setProperty('--shadow', shadowColor);

    colorSnakeGame = colorSnake;
    colorMap = fieldColor;
    isSettings = showSettings;

    return {
        colorSnakeGame,
        colorMap,
        isSettings
    };
}