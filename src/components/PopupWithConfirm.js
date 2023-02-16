import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selector, config) {
    super(selector, config);

    this._create();
	}

  _create = () => {
    super._create();

    this._confirmButton = this._popup.querySelector(this._config.confirmButtonSelector);
  }

  _setEventListeners() {
    super._setEventListeners();

    this._confirmButton.addEventListener("click", () => this._deleteCardCallback(this._id, this._card));
  }

  open = (id, card, deleteCardCallback) => {
    this._id = id;
    this._card = card;
    this._deleteCardCallback = deleteCardCallback;

    super.open();
  }
}