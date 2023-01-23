export default class FormValidator {
	constructor(config, form) {
		this._config = config;
		this._form = form;
	}

	_addStatusSubmitButton = (submitButton) => {
		const isValid = this._form.checkValidity();

		if (isValid) {
			submitButton.classList.remove(this._config.inactiveButtonClass);
			submitButton.disabled = false;
		} else {
			submitButton.classList.add(this._config.inactiveButtonClass);
			submitButton.disabled = true;
		}
	}

	_validateInput = (input) => {
		const error = this._form.querySelector(`#${input.name}-error`);

		if (!input.validity.valid) {
			error.textContent = input.validationMessage;
			input.classList.add(this._config.inputErrorClass);
		} else {
			error.textContent = "";
			input.classList.remove(this._config.inputErrorClass);
		}
	}

	enableValidation = () => {
		const inputs = this._form.querySelectorAll(this._config.inputSelector);
		const submitButton = this._form.querySelector(this._config.submitButtonSelector);

		inputs.forEach((input) => {
			input.addEventListener("input", () => {
				this._validateInput(input);
				this._addStatusSubmitButton(submitButton);
			});
		});

		this._addStatusSubmitButton(submitButton);

		this._form.addEventListener("reset", () => {
			setTimeout(() => {
				this._addStatusSubmitButton(submitButton);
			}, 0);
		});
	};
};