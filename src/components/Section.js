export default class Section {
  constructor(renderer, selector) {
    this._renderCallback = renderer;
    this._selector = selector;

    this._create();
  }

  _create = () => {
    this._section = document.querySelector(this._selector);
  }

  addItem = (data) => {
    this._section.prepend(this._renderCallback(data));
  }

  render = (data) => {
    this._section.append(...data.map(item => this._renderCallback(item)));
  }
}