import { getTargetElement } from "src/utils/getTargetElement";
import { createMain } from "./createMain";

type SelectChangeEvent = Event & { target: HTMLSelectElement };

export function changeSizeMain(e: SelectChangeEvent, rowLength: number): number {
    const { target } = e;
    if (target) {
        const { value } = target;

        const main = getTargetElement('main', document.getElementsByTagName('div'));
        if (main) createMain(Number(value), main);

        rowLength = Number(value);
    }
    return rowLength;
}