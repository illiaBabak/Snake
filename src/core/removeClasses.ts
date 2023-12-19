export function removeClasses(squares: HTMLDivElement[], classesToRemove: string[]): void {
    squares.forEach((square) => {
        square.classList.remove(...classesToRemove);
        square.removeAttribute('style');
    });
}
