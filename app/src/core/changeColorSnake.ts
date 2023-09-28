import { getTargetElements } from "src/utils/getTargetElements";

export function changeColorSnake(color: string): void {
    const snakeParts = getTargetElements('snake', document.getElementsByTagName('div'));
    for (let i = 0; i < snakeParts.length; i++) {
        snakeParts[i].style.background = color;
    }
}