import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, config, submitFormCallback) {
    super(selector, config);

    this._submitFormCallback = submitFormCallback;

    this._create();
  }

  _getInputValues = () => {
    const values = {}

    this._inputs.forEach(input => {
      values[input.name] = input.value
    });

    return values;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._submitFormCallback(values);
    this.close();
  }

  _setEventListeners = () => {
    this._form.addEventListener("submit", this._handleSubmitForm);
    super._setEventListeners();
  }

  _create = () => {
    this._form = this._popup.querySelector(this._config.formSelector);
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
  }

  get form() {
    return this._form;
  }

  close = () => {
    this._form.reset();

    super.close();
  }
}