export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._create();
  }

  _setSubmitButtonState = () => {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _validateInput = (input) => {
    const error = this._form.querySelector([this._config.errorSelector, input.name].join("_"));

    if (!input.validity.valid) {
      error.textContent = input.validationMessage;
      input.classList.add(this._config.inputErrorClass);
    } else {
      error.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._setSubmitButtonState();
      });
    });

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._setSubmitButtonState();
      }, 0);
    });
  }

  _create = () => {
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation = () => {
    this._setEventListeners();
    this._setSubmitButtonState();
  };
};