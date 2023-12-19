export function createMap(size: number, map: HTMLDivElement): void {
    map.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-div');
        map.appendChild(div);
    }

    map.style.width = `${size * 12}px`;
    map.style.height = `${size * 12}px`;
}