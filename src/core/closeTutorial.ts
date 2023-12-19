import { getCoreElements } from './getCoreElements';

export function closeTutorial(currentSnake: number[], tutorialOverlay: HTMLDivElement, map: HTMLDivElement): void {
  const { container, squares, scoreDiv, containerSettings } = getCoreElements();
  if (!squares || !scoreDiv || !containerSettings || !container) return;

  scoreDiv.classList.remove('hidden');
  containerSettings.classList.remove('hidden');
  map.classList.remove('hidden');
  container.classList.add('row');
  tutorialOverlay.classList.add('hidden');

  currentSnake.forEach((index) => {
    if (index >= 0 && index < squares.length) {
      squares[index].classList.add('snake');
    }
  });
}
