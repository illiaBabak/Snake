import { addListenersToModalButton } from './addListenersToModalButton';
import { getCoreElements } from './getCoreElements';

export function openOrCloseModal(): void {
  const { overlay } = getCoreElements();
  if (!overlay) return;

  overlay.classList.toggle('hidden');

  addListenersToModalButton();
}
