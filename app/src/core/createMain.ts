export function createMain(size: number, main: HTMLDivElement): void {
    main.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-div');
        main.appendChild(div);
    }

    main.style.width = `${size * 20}px`;
    main.style.height = `${size * 20}px`;
}