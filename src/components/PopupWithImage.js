import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, config) {
    super(selector, config);

    this._create();
  }

  _create = () => {
    this._image = this._popup.querySelector(this._config.imageSelector);
    this._text = this._popup.querySelector(this._config.textSelector);
  }

  open = (name, link) => {
    this._image.alt = name;
    this._image.src = link;
    this._text.textContent = name;

    super.open();
  }
}