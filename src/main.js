import MainPresenter from "./presenter.js";

const container =document.querySelector('.container');
const presenter = new MainPresenter(container);
presenter.init();

