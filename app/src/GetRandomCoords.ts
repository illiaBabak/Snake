export function getRandomCoords(container: HTMLElement): { x: number; y: number } {
  const mainWidth = container.clientWidth;
  const mainHeight = container.clientHeight;
  const appleSize = 40;

  const randomX = Math.floor(getRandomNumber(120, mainWidth) - appleSize);
  const randomY = Math.floor(getRandomNumber(120, mainHeight) - appleSize);

  return { x: randomX, y: randomY };
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
