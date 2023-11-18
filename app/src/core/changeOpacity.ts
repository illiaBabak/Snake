import { hexToRGB } from "src/utils/hexToRgba";
import { gameSettings } from "src/variables/variables";

export function changeOpacity(changeOpacity: boolean): void {
    const rgbaColor = hexToRGB(gameSettings.colorSnakeGame, changeOpacity ? 0.15 : 1);
    gameSettings.colorSnakeGame = rgbaColor;
}