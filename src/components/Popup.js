export default class Popup {
  constructor(selector, config) {
    this._selector = selector;
    this._config = config;

    this._create();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCLickClose = (evt) => {
    if (evt.target.classList.contains(this._config.overlayClass) ||
      evt.target.classList.contains(this._config.closeButtonClass)) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleCLickClose);
  }

  _removeEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _create() {
    this._popup = document.querySelector(this._selector);
  }

  get popup() {
    return this._popup;
  }

  open() {
    this._popup.classList.add(this._config.openedClass);
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._config.openedClass);
    this._removeEventListeners();
  }
}