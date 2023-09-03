export function createSnakePart() {
  const snakePart = document.createElement('div');
  snakePart.classList.add('snake-part');

  const imgSnakePart = document.createElement('img');
  imgSnakePart.setAttribute('src', '/content/body_vertical.png');
  snakePart.appendChild(imgSnakePart);

  return snakePart;
}
