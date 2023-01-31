import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, container, config, form, submitFormCallback) {
    super(selector, container, config);
    this._form = form;
    this._submitFormCallback = submitFormCallback;
    this._inputs = this._form.querySelectorAll(`.${this._config.inputSelector}`);
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

  close = () => {
    this._form.reset();
    super.close();
  }
}