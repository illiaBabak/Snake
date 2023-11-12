import { CheckBoxChangeEvent } from "src/types/eventTypes";
import { getTargetElement } from "src/utils/getTargetElement";

export function showImgInput(e: CheckBoxChangeEvent): void {
    const lineAnimation = getTargetElement('line-animation-img', document.getElementsByTagName('div'));
    if (!lineAnimation) return;

    lineAnimation.classList.add('disabled');

    if (e.target.checked) {
        lineAnimation.classList.remove('disabled');
        lineAnimation.scrollIntoView({ behavior: "smooth", block: "center" });
        lineAnimation.classList.add('border-animation');

        setTimeout(() => {
            lineAnimation.classList.remove('border-animation')
        }, 1600);
    }
}
