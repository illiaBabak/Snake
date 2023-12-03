import { defaultSettings, gameSettings } from "src/variables/gameSettings";
import { moveSnakeParts } from "./moveSnakeParts";
import { eatApple } from "./eatApple";
import { changeCSSVariable } from "./changeCSSVariable";

export function moveSnake(squares: HTMLDivElement[]): void {
    if (!squares) return;

    const tail = defaultSettings.currentSnake.pop();
    const { direction, currentSnake } = defaultSettings;

    if (tail) squares[tail].classList.remove('snake');
    else squares[0].classList.remove('snake');

    moveSnakeParts(squares, currentSnake, direction);
    changeCSSVariable(gameSettings.colorSnake, '--color-snake');

    if (tail) eatApple(squares, tail);
}