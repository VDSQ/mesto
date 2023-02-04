export default class Section {
  constructor(data, selector) {
    this._items = data.items;
    this._renderCallback = data.renderer;
    this._selector = selector;

    this._create();
  }

  _create = () => {
    this._section = document.querySelector(this._selector);
  }

  addItem = (data) => {
    this._section.prepend(this._renderCallback(data.name, data.image));
  }

  render = () => {
    this._section.append(...this._items.map(item => this._renderCallback(item.name, item.link)));
  }
}