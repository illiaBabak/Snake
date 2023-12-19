import { getCoreElements } from './getCoreElements';

function isEdgeDetected(currentSnake: number[], rowLength: number, direction: number): boolean {
  return (
    (currentSnake[0] + rowLength >= rowLength * rowLength && direction === rowLength) ||
    (currentSnake[0] % rowLength === rowLength - 1 && direction === 1) ||
    (currentSnake[0] % rowLength === 0 && direction === -1) ||
    (currentSnake[0] - rowLength <= 0 && direction === -rowLength)
  );
}

export function checkIsGameOver(
  squares: HTMLDivElement[],
  direction: number,
  rowLength: number,
  currentSnake: number[]
): boolean {
  if (currentSnake[0] + direction === 0) return false;

  if (
    squares[currentSnake[0]].classList.contains('teleport-el') &&
    squares[currentSnake[0] + direction].classList.contains('obstacle-el')
  )
    return false;

  if (
    isEdgeDetected(currentSnake, rowLength, direction) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    const { startButton, pauseButton } = getCoreElements();
    if (startButton && pauseButton) {
      startButton.innerText = 'Try again';
      startButton.classList.remove('disabled-settings');
      pauseButton.classList.add('disabled-settings');
    }
    return true;
  }

  return false;
}
