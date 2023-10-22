import { getTargetElement } from "src/utils/getTargetElement";
import { createMap } from "./createMap";

type SelectChangeEvent = Event & { target: HTMLSelectElement };

export function changeSizeMap(e: SelectChangeEvent, rowLength: number): number {
    const { target } = e;
    const map = getTargetElement('map', document.getElementsByTagName('div'));

    if (target && map) {
        const { value } = target;

        createMap(Number(value), map);

        rowLength = Number(value);
    }
    return rowLength;
}