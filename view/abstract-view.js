import { createElement } from "../src/utils.js";
import { render } from "../src/utils.js";

export default class AbstractView {

    #element;

    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
        }

      return this.#element;
    }

    get template() {
      throw new Error('Abstract method not implemented: get template');
    }

    removeElement() {
      this.#element.remove();
      this.#element = null;
    }

    restoreHandlers() {
      throw new Error('Abstract method not implemented: restoreHandlers');
    }
}