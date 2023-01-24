import AbstractView from "./abstract-view.js";

const createBetTemplate = (sum, cf) => {
    return (
       `<div class="solo-bet-info">
            <p class="bet-info-sum">${sum}</p>
            <p class="bet-info-cf">${cf}</p>
            <div class="bet-buttons">
                <button type="button" class="bet-button good-bet__button"></button>
                <button type="button" class="bet-button bad-bet__button"></button>
            </div>
        </div>`
    )
};

export default class BetView extends AbstractView {

    #sum;
    #cf;
    #onBadButtonClick;
    #onGoodButtonClick;

    
    constructor(sum, cf, onGoodButtonClick, onBadButtonClick) {
        super();
        this.#sum = sum;
        this.#cf = cf;
        this.#onBadButtonClick = onBadButtonClick;
        this.#onGoodButtonClick = onGoodButtonClick;

        this.restoreHandlers();
    };

    get template() {
        return createBetTemplate(this.#sum, this.#cf);
    }

    get prizeValue() {
       return Number(this.element.querySelector('.bet-info-sum').textContent * this.element.querySelector('.bet-info-cf').textContent);
    }

    #greenButtonHandler = () => {
        this.#onGoodButtonClick();
        this.removeElement();
    }

    #redButtonHandler = () => {
        this.#onBadButtonClick();
        this.removeElement();
    } 

    restoreHandlers() {
        this.element.querySelector('.bad-bet__button').addEventListener('click', this.#redButtonHandler);
        this.element.querySelector('.good-bet__button').addEventListener('click', this.#greenButtonHandler);
    }
}