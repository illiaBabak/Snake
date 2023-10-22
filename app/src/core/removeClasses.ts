export function removeClasses(squares: HTMLDivElement[], classesToRemove: string[]): void {
    squares.forEach((square) => {
        classesToRemove.forEach((className) => {
            square.classList.remove(className);
            square.removeAttribute('style');
        });
    });
}
