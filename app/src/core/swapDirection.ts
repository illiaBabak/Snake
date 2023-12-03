import { defaultSettings } from "src/variables/gameSettings";
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
    const shiftX = startCoordinates.x - endCoordinates.x;
    const shiftY = startCoordinates.y - endCoordinates.y;

    const { rowLength, rotateDirection } = defaultSettings;
    let keyCode = '';

    if (Math.abs(shiftX) > Math.abs(shiftY))
        keyCode = shiftX > 0 ? 'KeyA' : 'KeyD';

    else if (Math.abs(shiftY) > 0)
        keyCode = shiftY > 0 ? 'KeyW' : 'KeyS';

    defaultSettings.direction = changeDirection(keyCode, rowLength, defaultSettings.direction, rotateDirection);
}