export default class FormValidator {
	constructor(config, form) {
		this._config = config;
		this._form = form;
	}

	_showError = (form, input, config) => {
		const error = form.querySelector(`#${input.name}-error`);
		error.textContent = input.validationMessage;
		input.classList.add(config.inputErrorClass)
	}

	_hideError = (form, input, config) => {
		const error = form.querySelector(`#${input.name}-error`);
		error.textContent = "";
		input.classList.remove(config.inputErrorClass);
	};

	_checkValidationInput = (form, input, config) => {
		if (!input.validity.valid) {
			this._showError(form, input, config);
		} else {
			this._hideError(form, input, config);
		}
	};

	_disabledButton = (button, config) => {
		button.classList.add(config.inactiveButtonClass);
		button.disabled = true;
	};

	_CheckButtonStatus = (button, isActive, config) => {
		if (isActive) {
			button.classList.remove(config.inactiveButtonClass);
			button.disabled = false;
		} else {
			this._disabledButton(button, config);
		}
	};

	_setEventListeners = (form, config, button) => {
		this._inputs.forEach((input) => {
			input.addEventListener('input', () => {
				this._checkValidationInput(form, input, config);
				this._CheckButtonStatus(button, form.checkValidity(), config);
			});
		});
	};

	enableValidation = () => {
		this._inputs = this._form.querySelectorAll(this._config.inputSelector);
		this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
		this._setEventListeners(this._form, this._config, this._submitButton);

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._disabledButton(this._submitButton, this._config);
		});

		this._CheckButtonStatus(this._submitButton, this._form.checkValidity(), this._config);
	};
};