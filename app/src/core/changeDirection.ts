export function changeDirection(key: string, rowLength: number, lastDirection: number): number {
    if (lastDirection === +rowLength && key === 'KeyW') return +rowLength;

    if (lastDirection === -rowLength && key === 'KeyS') return -rowLength;

    if (lastDirection === -1 && key === 'KeyD') return -1;

    if (lastDirection === 1 && key === 'KeyA') return 1;

    let direction = 1;

    if (key === 'KeyW') direction = -rowLength;
    else if (key === 'KeyS') direction = +rowLength;
    else if (key === 'KeyA') direction = -1;
    else if (key === 'KeyD') direction = 1;

    return direction;
}
