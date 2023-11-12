export function showTutorial(overlayStart: HTMLElement, tutorialOverlay: HTMLElement): void {
  overlayStart.classList.add('hidden');
  tutorialOverlay.classList.remove('hidden');
}
