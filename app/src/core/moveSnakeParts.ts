import { getTargetElement } from "src/utils/getTargetElement";

export function moveSnakeParts(squares: HTMLDivElement[], currentSnake: number[], direction: number): void {
    if (squares[currentSnake[0]].classList.contains('first-teleport')) {
        const secondTeleportDiv = getTargetElement('second-teleport', document.getElementsByTagName('div'));
        if (secondTeleportDiv) {
            const indexOfSecondTeleport = squares.indexOf(secondTeleportDiv);
            currentSnake.unshift(indexOfSecondTeleport + direction);
        }
    } else if (squares[currentSnake[0]].classList.contains('second-teleport')) {
        const firstTeleportDiv = getTargetElement('first-teleport', document.getElementsByTagName('div'));
        if (firstTeleportDiv) {
            const indexOfFirstTeleport = squares.indexOf(firstTeleportDiv);
            currentSnake.unshift(indexOfFirstTeleport + direction);
        }
    } else currentSnake.unshift(currentSnake[0] + direction);

    squares[currentSnake[0]].classList.add('snake');
}