export default class Popup {
	constructor(selector, container, config) {
    this._selector = selector;
    this._container = container;
    this._config = config;
	}

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCLickClose = (evt) => {
    if (evt.target.classList.contains(this._config.overlaySelector)) {
      this.close();
    } else if (evt.target.classList.contains(this._config.closeButtonSelector)) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._container.addEventListener("mousedown", this._handleCLickClose);
  }

  _removeEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._container.classList.add(this._config.openedSelector);
    this._setEventListeners();
  }

  close() {
    this._container.classList.remove(this._config.openedSelector);
    this._removeEventListeners();
  }
}