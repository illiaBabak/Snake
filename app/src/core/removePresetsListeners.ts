import { getCoreElements } from "./getCoreElements";
import { changePreset } from "./changePreset";

export function removePresetsListeners(): void {
    const { listEls } = getCoreElements();
    if (!listEls) return;

    for (let i = 0; i < listEls.length; i++) {
        listEls[i].addEventListener('click', () => changePreset);
    }
}