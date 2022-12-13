const configValidPopup = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button_submit-invalid',
	inputErrorClass: 'popup__input_state_invalid'
};

function showErr(form, input, config) {
	const error = form.querySelector(`#${input.name}-error`);
	error.textContent = input.validationMessage;
	input.classList.add(config.inputErrorClass);
}

function hideErr(form, input, config) {
	const error = form.querySelector(`#${input.name}-error`);
	error.textContent = '';
	input.classList.remove(config.inputErrorClass);
}

function checkInputValid(form, input, config) {
	if (!input.validity.valid) {
		showErr(form, input, config);
	} else {
		hideErr(form, input, config);
	}
}

function disableButton(button, config) {
	button.classList.add(config.inactiveButtonClass);
	button.disabled = true;
}

function checkButtonStatus(button, isActive, config) {
	if (isActive) {
		button.classList.remove(config.inactiveButtonClass);
		button.disabled = false;
	} else {
		disableButton(button, config);
	}
}

function setEventListener(form, config) {
	const inputs = form.querySelectorAll(config.inputSelector);
	const submitButton = form.querySelector(config.submitButtonSelector);

	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			checkInputValid(form, input, config);
			checkButtonStatus(submitButton, form.checkValidity(), config);
		});
	});
}

function enableValid(config) {
	const forms = document.querySelectorAll(config.formSelector);
	forms.forEach((form) => {
		setEventListener(form, config);

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			disableButton(submitButton, config);
		});

		const submitButton = form.querySelector(config.submitButtonSelector);
		checkButtonStatus(submitButton, form.checkValidity(), config);
	});
}

enableValid(configValidPopup);