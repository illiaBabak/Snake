import { hexToRGB } from "src/utils/hexToRgba";
import { gameSettings } from "src/variables/variables";

export function changeOpacity(changeOpacity: boolean): void {
    const rgbaColor = hexToRGB(gameSettings.colorSnake, changeOpacity ? 0.15 : 1);
    gameSettings.colorSnake = rgbaColor;
}