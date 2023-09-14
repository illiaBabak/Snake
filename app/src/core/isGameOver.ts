export function isGameOver(squares: HTMLDivElement[], direction: number, ROW_LENGTH: number, currentSnake: number[], lastKey: string): boolean {
    // if ((direction === +ROW_LENGTH && lastKey === 'KeyS') || (direction === -ROW_LENGTH && lastKey === 'KeyW')) return false;

    // else if ((direction === 1 && lastKey === 'KeyD') || (direction === -1 && lastKey === 'KeyA')) return false;

    if (
        (currentSnake[0] + ROW_LENGTH >= ROW_LENGTH * ROW_LENGTH && direction === ROW_LENGTH) ||
        (currentSnake[0] % ROW_LENGTH === ROW_LENGTH - 1 && direction === 1) ||
        (currentSnake[0] % ROW_LENGTH === 0 && direction === -1) ||
        (currentSnake[0] - ROW_LENGTH <= 0 && direction === -ROW_LENGTH) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return true;
    }

    return false;
}
