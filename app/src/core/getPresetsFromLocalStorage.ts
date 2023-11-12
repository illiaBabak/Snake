import { Preset } from "src/types/preset";

function isPreset(data: unknown): data is Preset {
    return (
        !!data &&
        typeof data === 'object' &&
        Object.keys(data).every((key) => typeof key === 'string') &&
        Object.values(data).every((value) => typeof value === 'string' || typeof value === 'boolean')
    );
}

function isPresetsArray(data: unknown): data is Preset[] {
    return Array.isArray(data) && data.every((preset) => isPreset(preset));
}

export function getPresetsFromLocalStorage(): Preset[] {
    const storagePresetsData = localStorage.getItem('presets');
    const parsedPresetsData: unknown = storagePresetsData ? JSON.parse(storagePresetsData) : null;
    const presetsData = isPresetsArray(parsedPresetsData) ? parsedPresetsData : [];
    return presetsData;
}