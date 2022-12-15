function addStatusSubmitButton(form, submitButton, inactiveButtonClass) {
	const isValid = form.checkValidity();

	if (isValid) {
		submitButton.classList.remove(inactiveButtonClass);
		submitButton.disabled = false;
	} else {
		submitButton.classList.add(inactiveButtonClass);
		submitButton.disabled = true;
	}
}

function validateInput(form, input, inputErrorClass) {
	const error = form.querySelector(`#${input.name}-error`);

	if (!input.validity.valid) {
		error.textContent = input.validationMessage;
		input.classList.add(inputErrorClass);
	} else {
		error.textContent = '';
		input.classList.remove(inputErrorClass);
	}
}

function enableValidation(config) {
	const forms = document.querySelectorAll(config.formSelector);

	forms.forEach((form) => {
		const inputs = form.querySelectorAll(config.inputSelector);
		const submitButton = form.querySelector(config.submitButtonSelector);

		inputs.forEach((input) => {
			input.addEventListener('input', () => {
				validateInput(form, input, config.inputErrorClass);
				addStatusSubmitButton(form, submitButton, config.inactiveButtonClass);
			});
		});
		
		addStatusSubmitButton(form, submitButton, config.inactiveButtonClass);

		form.addEventListener('reset', () => {
			setTimeout(() => {
			  addStatusSubmitButton(form, submitButton, config.inactiveButtonClass);
			}, 0); 
		  });
	});
}

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button_submit-invalid',
	inputErrorClass: 'popup__input_state_invalid'
});