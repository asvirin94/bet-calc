import AbstractView from "./abstract-view.js";

const createNewBetTemplate = () => {
    return (
        `<div class="bet-form">
            <div class="bet-form-fields">
                <input type="text" class="bet-sum">
                <input type="text" class="bet-cf"> 
            </div>  
            <div class="bet-form-buttons">
                <input type="button" class="bet-add-button" value="Добавить">
                <input type="button" class="bet-how-much-button" value="Сколько ставить?">
            </div> 
            
         </div>`
    )
};

export default class NewBetView extends AbstractView {

    #onButtonClick;
    #onHowMuchButtonClick;

    constructor(onButtonClick, onHowMuchButtonClick) {
        super();

        this.#onButtonClick = onButtonClick;
        this.#onHowMuchButtonClick = onHowMuchButtonClick;
        this.restoreHandlers();
    };

    get template() {
        return createNewBetTemplate();
    }

    restoreHandlers() {
        this.element.querySelector('.bet-add-button').addEventListener('click', this.#onButtonClick);
        this.element.querySelector('.bet-how-much-button').addEventListener('click', this.#onHowMuchButtonClick);
      }
}