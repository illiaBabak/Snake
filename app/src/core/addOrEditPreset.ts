import { createListPresets } from "./createListPresets";
import { getPresetInfo } from "./getPresetInfo";
import { getPresetsFromLocalStorage } from "./getPresetsFromLocalStorage";

export function addOrEditPreset(key?: string): void {
    const data = getPresetsFromLocalStorage();
    const newOrEditPreset = getPresetInfo();

    if (key) data[data.findIndex((item) => item.key === key)] = newOrEditPreset;
    else data.push(newOrEditPreset);

    localStorage.setItem('presets', JSON.stringify(data));

    createListPresets(true);
}