import { CheckBoxChangeEvent } from "src/types/eventTypes";
import { getCoreElements } from "./getCoreElements";

export function showImgInput(e: CheckBoxChangeEvent): void {
    const { lineAnimation } = getCoreElements();
    if (!lineAnimation) return;

    if (!e.target.checked) {
        lineAnimation.classList.add('disabled');
        return;
    }

    lineAnimation.classList.remove('disabled');
    lineAnimation.scrollIntoView({ behavior: "smooth", block: "center" });
    lineAnimation.classList.add('border-animation');

    setTimeout(() => {
        lineAnimation.classList.remove('border-animation')
    }, 1600);

}
