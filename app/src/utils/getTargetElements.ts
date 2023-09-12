export function getTargetElements<T extends HTMLElement>(className: string, tagsList: HTMLCollectionOf<T>): T[] {
  const searchedElements: T[] = [];

  for (let i = 0; i < tagsList.length; i++) {
    const el = tagsList[i];
    if ([...el.classList].includes(className)) {
      searchedElements.push(el);
    }
  }

  return searchedElements;
}
