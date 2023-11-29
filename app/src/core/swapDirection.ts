import { defaultSettings } from "src/variables/variables";
import { changeDirection } from "./changeDirection";

let startCoordinates = { x: 0, y: 0 };
let endCoordinates = { x: 0, y: 0 };

export function startSwap(e: TouchEvent): void {
    startCoordinates = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
    };
}

export function endSwap(e: TouchEvent): void {
    endCoordinates = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
    };

    changeDirectionSwap();
}

function changeDirectionSwap(): void {
    const minusX = startCoordinates.x - endCoordinates.x;
    const minusY = startCoordinates.y - endCoordinates.y;

    const { rowLength, rotateDirection } = defaultSettings;

    if (minusX > 0 && Math.abs(minusX) > Math.abs(minusY))
        defaultSettings.direction = changeDirection('KeyA', rowLength, defaultSettings.direction, rotateDirection);
    else if (minusX < 0 && Math.abs(minusX) > Math.abs(minusY))
        defaultSettings.direction = changeDirection('KeyD', rowLength, defaultSettings.direction, rotateDirection);

    if (minusY > 0 && Math.abs(minusX) < Math.abs(minusY))
        defaultSettings.direction = changeDirection('KeyW', rowLength, defaultSettings.direction, rotateDirection);
    else if (minusY < 0 && Math.abs(minusX) < Math.abs(minusY))
        defaultSettings.direction = changeDirection('KeyS', rowLength, defaultSettings.direction, rotateDirection);
}