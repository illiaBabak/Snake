import { createListPresets } from "./createListPresets";
import { getPresetsFromLocalStorage } from "./getPresetsFromLocalStorage";

export function deletePreset(key: string): void {
    const data = getPresetsFromLocalStorage();
    const preset = data.find((obj) => obj.key === key);

    if (!preset) return;

    const filteredData = data.filter((item) => item.key !== preset.key);

    localStorage.setItem('presets', JSON.stringify(filteredData));

    createListPresets();
    createListPresets(true);
}