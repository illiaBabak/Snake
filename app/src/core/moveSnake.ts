import { defaultSettings, gameSettings } from "src/variables/variables";
import { moveSnakeParts } from "./moveSnakeParts";
import { changeColorSnake } from "./changeColorSnake";
import { eatApple } from "./eatApple";

export function moveSnake(squares: HTMLDivElement[]): void {
    if (!squares) return;

    const tail = defaultSettings.currentSnake.pop();
    const { direction } = defaultSettings;

    if (tail) squares[tail].classList.remove('snake');
    else squares[0].classList.remove('snake');

    moveSnakeParts(squares, defaultSettings.currentSnake, direction);
    changeColorSnake(gameSettings.colorSnake);

    if (tail) eatApple(squares, tail);
}