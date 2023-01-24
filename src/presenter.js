import { render } from "./utils.js";
import StartPageView from "../view/start-page-view.js";
import MainPageView from "../view/main-page-view.js";
import NewBetView from "../view/new-bet-view.js";
import BetView from "../view/bet-view.js";
import BetsListView from "../view/bets-list-view.js";
import { globalData } from "../model/data.js";

export default class MainPresenter {

    #container;
    #startPage;
    #mainPage;
    #betsList;
    #newBetForm;
    #newBet;

    constructor(container) {
        this.#container = container;
    }

    init() {
       this.#startPage = new StartPageView(this.#goToMainPage);
       this.#betsList = new BetsListView();
       this.#renderStartPage();
    }

    #renderStartPage = () => {
        render(this.#startPage.element, this.#container)
    }

    #renderMainPage = () => {
        this.#mainPage = new MainPageView();
    }

    #goToMainPage = () => {
        globalData.startSum = Number(this.#startPage.element.querySelector('#summary').value);
        globalData.deficit = Number(this.#startPage.element.querySelector('#deficit').value);
        globalData.actualSum = globalData.startSum;
        this.#renderMainPage();
        this.#startPage.removeElement();
        render(this.#mainPage.element, this.#container);
        this.#renderNewBetForm();
        render(this.#betsList.element, this.#container);
    }

    #renderNewBetForm = () => {
        this.#newBetForm = new NewBetView(this.#renderNewBet, this.#getHowMuchToBet);
        render(this.#newBetForm.element, this.#container);
    }

    #getHowMuchToBet = () => {
        const cfValue = Number(this.#newBetForm.element.querySelector('.bet-cf').value);
        if(!cfValue) {
            this.#newBetForm.element.querySelector('.bet-sum').value = "Укажите кф";
        } else {
            this.#newBetForm.element.querySelector('.bet-sum').value = Math.ceil(globalData.deficit / cfValue);
        }
        
    }

    #renderNewBet = () => {
        const sumValue = Number(this.#newBetForm.element.querySelector('.bet-sum').value);
        const cfValue = Number(this.#newBetForm.element.querySelector('.bet-cf').value);
        globalData.actualSum = globalData.actualSum - sumValue;
        this.#newBet = new BetView(sumValue, cfValue, this.#takeNiceBet, this.#removeSheetBet);
        this.#newBet.restoreHandlers();
        render(this.#newBet.element, this.#betsList.element);
        this.#mainPage.removeElement();
        this.#newBetForm.removeElement();
        this.#renderMainPage();
        render(this.#newBetForm.element, this.#container, "afterBegin");
        render(this.#mainPage.element, this.#container, "afterBegin");
        this.#newBetForm.restoreHandlers();
    }

    #takeNiceBet = () => {
        const prize = this.#newBet.prizeValue;
        globalData.actualSum = globalData.actualSum + prize;

        if(prize > globalData.deficit) {
            globalData.deficit = 0;
        } else {
            globalData.deficit = globalData.deficit - prize;
        }
        this.#rerenderPage();
    }

    #removeSheetBet = () => {
        globalData.deficit = globalData.deficit + Number(this.#newBet.element.querySelector('.bet-info-sum').textContent);
        this.#rerenderPage();
    }

    #rerenderPage = () => {
        this.#mainPage.removeElement();
        this.#newBetForm.removeElement();
        this.#renderMainPage();
        render(this.#newBetForm.element, this.#container, "afterBegin");
        render(this.#mainPage.element, this.#container, "afterBegin");
        this.#newBetForm.restoreHandlers();
    }
}   


