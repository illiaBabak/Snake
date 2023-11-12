import { getRandomInteger } from "src/utils/getRandomInteger";

export function rotateMap(map: HTMLDivElement): void {
    let rotateMapDeg = 0;

    rotateMapDeg = getRandomInteger(90, 270);
    map.style.transform = `rotateZ(${rotateMapDeg}deg)`;

    setTimeout(() => {
        map.style.transform = `rotateZ(${0}deg)`;
    }, 4000);
}