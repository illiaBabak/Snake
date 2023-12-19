export function changeDirection(
  key: string,
  rowLength: number,
  lastDirection: number,
  isDirectionFlip: boolean
): number {
  const isTopDirection = lastDirection === -rowLength;
  const isDownDirection = lastDirection === +rowLength;
  const isRightDirection = lastDirection === 1;
  const isLeftDirection = lastDirection === -1;

  if (isDownDirection && ((!isDirectionFlip && key === 'KeyW') || (isDirectionFlip && key === 'KeyS')))
    return +rowLength;

  if (isTopDirection && ((!isDirectionFlip && key === 'KeyS') || (isDirectionFlip && key === 'KeyW')))
    return -rowLength;

  if (isLeftDirection && ((!isDirectionFlip && key === 'KeyD') || (isDirectionFlip && key === 'KeyA'))) return -1;

  if (isRightDirection && ((!isDirectionFlip && key === 'KeyA') || (isDirectionFlip && key === 'KeyD'))) return 1;

  let direction = 1;

  if (key === 'KeyW') direction = -rowLength;
  else if (key === 'KeyS') direction = +rowLength;
  else if (key === 'KeyA') direction = -1;
  else if (key === 'KeyD') direction = 1;

  return isDirectionFlip ? -direction : direction;
}
