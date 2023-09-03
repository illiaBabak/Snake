export function showTutorial(overlayStart: HTMLElement, tutorialOverlay: HTMLElement, main: HTMLElement) {
  overlayStart.classList.add('hidden');
  tutorialOverlay.classList.remove('hidden');
  main.classList.remove('hidden');
}
