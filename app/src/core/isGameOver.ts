import { getTargetElement } from "src/utils/getTargetElement";

export function isGameOver(squares: HTMLDivElement[], direction: number, rowLength: number, currentSnake: number[]): boolean {
    if (
        (currentSnake[0] + rowLength >= rowLength * rowLength && direction === rowLength) ||
        (currentSnake[0] % rowLength === rowLength - 1 && direction === 1) ||
        (currentSnake[0] % rowLength === 0 && direction === -1) ||
        (currentSnake[0] - rowLength <= 0 && direction === -rowLength) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
        if (startButton) startButton.innerText = 'Try again';
        return true;
    }

    return false;
}
