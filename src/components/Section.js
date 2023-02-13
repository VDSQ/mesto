export default class Section {
  constructor(renderer, selector, api) {
    this._renderCallback = renderer;
    this._selector = selector;
    this._api = api;

    this._create();
  }

  _create = () => {
    this._section = document.querySelector(this._selector);
  }

  addItem = (data) => {
    return this._api.setCard(data)
      .then((res) => this._section.prepend(this._renderCallback(data = res)))
      .catch((err) => console.log("Ошибка: Карточка не загрузилась ".concat(err)));
  }

  render = () => {
    return this._api.getInitialCards()
      .then((res) => this._section.append(...res.map(item => this._renderCallback(item))))
      .catch((err) => console.log("Ошибка: Карточки пользователей не загрузились ".concat(err)));
  }
}