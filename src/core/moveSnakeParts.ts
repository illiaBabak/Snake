import { getTargetElement } from 'src/utils/getTargetElement';

export function moveSnakeParts(squares: HTMLDivElement[], currentSnake: number[], direction: number): void {
  const getIsTeleportExists = (className: string) => squares[currentSnake[0]].classList.contains(className);

  const teleportSnake = (teleportClassName: string) => {
    const teleportDiv = getTargetElement(teleportClassName, document.getElementsByTagName('div'));
    if (!teleportDiv) return;

    const indexOfTeleport = squares.indexOf(teleportDiv);
    currentSnake.unshift(indexOfTeleport + direction);
  };

  if (getIsTeleportExists('first-teleport')) teleportSnake('second-teleport');
  else if (getIsTeleportExists('second-teleport')) teleportSnake('first-teleport');
  else currentSnake.unshift(currentSnake[0] + direction);

  squares[currentSnake[0]].classList.add('snake');
}
