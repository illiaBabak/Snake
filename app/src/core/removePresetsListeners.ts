import { getCoreElements } from "./getCoreElements";
import { changePreset } from "./changePreset";

export function removePresetsListeners(): void {
    const { listEls } = getCoreElements();
    if (!listEls) return;

    listEls.forEach((el) => {
        el.removeEventListener('click', () => changePreset);
    })
}