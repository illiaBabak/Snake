export function showTutorial(overlayStart: HTMLElement, tutorialOverlay: HTMLElement, main: HTMLElement): void {
  overlayStart.classList.add('hidden');
  tutorialOverlay.classList.remove('hidden');
  main.classList.remove('hidden');
}
