export function changeDirection(key: string, ROW_LENGTH: number, lastDirection: number): number {
    // if (lastDirection === +ROW_LENGTH && key === 'KeyW') return +ROW_LENGTH;

    // if (lastDirection === -ROW_LENGTH && key === 'KeyS') return -ROW_LENGTH;

    // if (lastDirection === 1 && key === 'KeyA') return 1;

    // if (lastDirection === -1 && key === 'KeyD') return -1;

    let direction = 1;

    if (key === 'KeyW') direction = -ROW_LENGTH;
    else if (key === 'KeyS') direction = +ROW_LENGTH;
    else if (key === 'KeyA') direction = -1;
    else if (key === 'KeyD') direction = 1;

    return direction;

}
