import { acceptPreset } from './acceptPreset';
import { getCoreElements } from './getCoreElements';


let paramKey = '';

export function addListenersToModalButton(key?: string): void {
  const { acceptButton } = getCoreElements();
  if (!acceptButton) return;
  if (key) paramKey = key;

  acceptButton.addEventListener('click', handleClick);
}

function handleClick(): void {
  const { acceptButton } = getCoreElements();
  if (!acceptButton) return;

  acceptPreset(paramKey);
  paramKey = '';
}
