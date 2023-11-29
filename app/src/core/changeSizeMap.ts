import { createMap } from "./createMap";
import { defaultSettings } from "src/variables/variables";
import { getCoreElements } from "./getCoreElements";

type SelectChangeEvent = Event & { target: HTMLSelectElement };

export function changeSizeMap(e: SelectChangeEvent): void {
    const { target } = e;
    const { value } = target;
    const { map } = getCoreElements();

    if (!map) return;

    createMap(Number(value), map);
    defaultSettings.rowLength = Number(value);
}