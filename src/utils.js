export const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstElementChild;
}

export const render = (element, container, place = 'beforeend') => {
    container.insertAdjacentElement(place, element);
}