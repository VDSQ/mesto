import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, container, config) {
    super(selector, container, config);
    this._image = document.querySelector(`.${this._config.imageSelector}`);
    this._text = document.querySelector(`.${this._config.textSelector}`);
	}

  open = (name, link) => {
    this._image.alt = name;
    this._image.src = link;
    this._text.textContent = name;
    super.open();
  }
}