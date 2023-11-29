import { DEFAULT_PRESETS } from 'src/variables/constants';
import { getCoreElements } from './getCoreElements';
import { changePreset } from './changePreset';
import { getPresetsFromLocalStorage } from './getPresetsFromLocalStorage';

export function addPresetsListeners(): void {
  const { listEls } = getCoreElements();
  if (!listEls) return;

  const data = getPresetsFromLocalStorage();
  const allPresets = [...DEFAULT_PRESETS, ...data];

  for (let i = 0; i < listEls.length; i++) {
    listEls[i].addEventListener('click', () => changePreset(allPresets[i]));
  }
}
