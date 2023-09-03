export function getTargetElement<T extends HTMLElement>(className: string, tagsList: HTMLCollectionOf<T>): T | undefined {
    const searchedElement = [...tagsList].find((el) => [...el.classList].includes(className));
    return searchedElement;
  }