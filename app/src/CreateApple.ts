import { getRandomCoords } from './GetRandomCoords';
import { getTargetElement } from './GetTargetElement';

export function createApple() {
  const appleDiv = document.createElement('div');
  appleDiv.classList.add('apple');

  const main = getTargetElement('main', document.getElementsByTagName('div'));
  if (main) {
    const { x, y } = getRandomCoords(main);
    appleDiv.style.left = `${x}px`;
    appleDiv.style.top = `${y}px`;
  }

  const appleImg = document.createElement('img');
  appleImg.setAttribute('src', '/content/apple.png');
  appleDiv.appendChild(appleImg);

  main?.appendChild(appleDiv);
}
