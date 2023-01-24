import AbstractView from "./abstract-view.js";
import { globalData } from "../model/data.js";

const createMainPageTemplate = () => {
    return (
        `<section class="main-page">
        <div class="financial-data">
            <p>at start ${globalData.startSum}</p>
            <p>now ${globalData.actualSum}</p>
            <p>def ${globalData.deficit}</p>
        </div>

        <div class="betting-history">
            <div class="bets-heading">
                <p>sum</p>
                <p>cf</p>
                <p>cntrls</p>
            </div>

        </div>
    </section>`
    )
};

export default class MainPageView extends AbstractView {

    #actualSum;

    constructor(actualSum) {
        super();
        this.#actualSum = actualSum;
    };

    get template() {
        return createMainPageTemplate(this.#actualSum);
    }
}