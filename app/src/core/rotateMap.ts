import { getRandomInteger } from "src/utils/getRandomInteger";

export function rotateMap(map: HTMLDivElement, pauseDiv: HTMLDivElement): void {
    const rotateMapDeg = getRandomInteger(90, 270);

    map.style.transform = `rotateZ(${rotateMapDeg}deg)`;
    pauseDiv.style.transform = `translate(-50%, -50%) rotateZ(${rotateMapDeg}deg)`;

    setTimeout(() => {
        map.style.transform = `rotateZ(${0}deg)`;
        pauseDiv.style.transform = `translate(-50%, -50%) rotateZ(${0}deg)`;
    }, 4000);
}