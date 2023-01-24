import AbstractView from "./abstract-view.js";

const createBetsListTemplate = () => {
    return (
       `<div class="bets-list">
            
        </div>`
    )
};

export default class BetsListView extends AbstractView {

    get template() {
        return createBetsListTemplate();
    }

    // set element(value) {
    //     this.element = value;
    // }
}