const initialCards = [
	{
		name: 'Зеленоград',
		link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
	},
	{
		name: 'Красноярск',
		link: 'https://images.unsplash.com/photo-1587451152235-05466c2fc532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
	},
	{
		name: 'Иркутск',
		link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
	},
	{
		name: 'Камчатка',
		link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
	},
	{
		name: 'Республика Коми',
		link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
	},
	{
		name: 'Санкт-Петербург',
		link: 'https://images.unsplash.com/photo-1588698947572-5563eed6d86a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
	}
];

function popupOpen(popup) {
	popup.classList.add('popup_opened');
}

function popupClose(popup) {
	popup.classList.remove('popup_opened');
}

function addCard(name, link) {
	const elements = document.querySelector('.elements');
	const element = document.querySelector("#element").content.cloneNode(true);
	const popupImage = document.querySelector('#popup-image');

	element.querySelector('.element__scription-title').textContent = name
	element.querySelector('.element__image').src = link
	element.querySelector('.element__image').alt = name

	element.querySelector('.element__bin-button').addEventListener('click', evt => {
		evt.target.closest('.element').remove();
	});

	element.querySelector(".element__scription-button").addEventListener('click', evt => {
		evt.target.classList.toggle("element__scription-button_active");
	});

	element.querySelector('.element__image').addEventListener('click', evt => {
		document.querySelector('.popup__image').src = evt.target.src;
		document.querySelector('.popup__text').textContent = name;
		popupOpen(popupImage);
	});

	popupImage.querySelector('.popup__button-close').addEventListener('click', () => {
		popupClose(popupImage);
	});

	elements.prepend(element)
}

function addCards() {
	for (let card of initialCards) {
		addCard(card.name, card.link)
	}
}

function profileEdit() {
	const profileTitle = document.querySelector('.profile__title');
	const profileSubtitle = document.querySelector('.profile__subtitle');
	const popupEdit = document.querySelector('#popup-edit');
	const popupTitle = document.querySelector('.popup__input_value_title')
	const popupSubtitle = document.querySelector('.popup__input_value_subtitle')


	document.querySelector('.profile__button-edit').addEventListener('click', () => {
		popupTitle.value = profileTitle.textContent;
		popupSubtitle.value = profileSubtitle.textContent;
		popupOpen(popupEdit);
	});

	popupEdit.querySelector('.popup__button-close').addEventListener('click', () => {
		popupClose(popupEdit);
	});

	popupEdit.addEventListener('submit', evt => {
		evt.preventDefault();
		profileTitle.textContent = popupTitle.value;
		profileSubtitle.textContent = popupSubtitle.value;
		popupClose(popupEdit);
	});
}

function profileAdd() {
	const popupAdd = document.querySelector('#popup-add');

	document.querySelector('.profile__button-add').addEventListener('click', () => {
		popupOpen(popupAdd);
	});

	popupAdd.querySelector('.popup__button-close').addEventListener('click', () => {
		popupClose(popupAdd);
	});

	popupAdd.addEventListener("submit", evt => {
		evt.preventDefault();
		const name = popupAdd.querySelector('.popup__input_value_name').value;
		const link = popupAdd.querySelector('.popup__input_value_image').value;
		addCard(name, link)
		popupClose(popupAdd);
		popupAdd.reset();
	});
}

addCards()
profileEdit()
profileAdd()