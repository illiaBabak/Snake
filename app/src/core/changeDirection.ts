export function changeDirection(key: string, rowLength: number, lastDirection: number, isDirectionFlip: boolean): number {
    if ((!isDirectionFlip && lastDirection === +rowLength && key === 'KeyW') ||
        (isDirectionFlip && lastDirection === +rowLength && key === 'KeyS')) return +rowLength;

    if ((!isDirectionFlip && lastDirection === -rowLength && key === 'KeyS') ||
        (isDirectionFlip && lastDirection === -rowLength && key === 'KeyW')) return -rowLength;

    if ((!isDirectionFlip && lastDirection === -1 && key === 'KeyD') ||
        (isDirectionFlip && lastDirection === -1 && key === 'KeyA')) return -1;

    if ((!isDirectionFlip && lastDirection === 1 && key === 'KeyA') ||
        (isDirectionFlip && lastDirection === 1 && key === 'KeyD')) return 1;

    let direction = 1;

    if (key === 'KeyW') direction = -rowLength;
    else if (key === 'KeyS') direction = +rowLength;
    else if (key === 'KeyA') direction = -1;
    else if (key === 'KeyD') direction = 1;

    return isDirectionFlip ? -direction : direction;
}
