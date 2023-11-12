import { getTargetElement } from "src/utils/getTargetElement";

export function checkIsGameOver(squares: HTMLDivElement[], direction: number, rowLength: number, currentSnake: number[]): boolean {
    if (currentSnake[0] + direction === 0) return false;

    if (squares[currentSnake[0]].classList.contains('teleport-el') && squares[currentSnake[0] + direction].classList.contains('obstacle-el')) return false;

    if (
        (currentSnake[0] + rowLength >= rowLength * rowLength && direction === rowLength) ||
        (currentSnake[0] % rowLength === rowLength - 1 && direction === 1) ||
        (currentSnake[0] % rowLength === 0 && direction === -1) ||
        (currentSnake[0] - rowLength <= 0 && direction === -rowLength) ||
        squares[currentSnake[0] + direction].classList.contains('snake') ||
        squares[currentSnake[0] + direction].classList.contains('obstacle-el')
    ) {
        const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
        if (startButton) {
            startButton.innerText = 'Try again';
            startButton.classList.remove('disabled');
        }
        return true;
    }

    return false;
}
