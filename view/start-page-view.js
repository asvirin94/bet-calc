import AbstractView from "./abstract-view.js";

const createStartPageTemplate = () => {
    return (
        `<section class="start-page">  
        <div class="start-fields">
            <input type="text" id="summary" placeholder="Общая сумма">
            <input type="text" id="deficit" placeholder="Дефицит">
            <input type="text" id="on-draws" placeholder="Тестовое поле">
        </div>

        <div class="start-buttons">
            <button type="button" class="field-button summary-button__submit"></button>
            <button type="button" class="field-button in-game-button__submit"></button>
            <button type="button" class="field-button on-draws-button__submit"></button>
        </div>  

        <button type="button" class="main-start__button"> Go!</button>
    </section>`
    )
};

export default class StartPageView extends AbstractView {

    #onButtonClick
    constructor(onButtonClick) {
        super();
        this.#onButtonClick = onButtonClick;
        
        this.element.querySelector('.main-start__button').addEventListener('click', this.#onButtonClick);
    };

    get template() {
        return createStartPageTemplate();
    }
}