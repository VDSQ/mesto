export default class Card {
	constructor(name, link, templateSelector, openPopupImage) {
		this._name = name;
		this._link = link;
		this._templateSelector = templateSelector;
		this._openImageCallback = openPopupImage;
	}

	_setListeners = (card) => {
		const removeButton = card.querySelector('.element__bin-button');
		removeButton.addEventListener('click', evt => {
			evt.target.closest('.element').remove();
		})

		const likeButton = card.querySelector(".element__scription-button");
		likeButton.addEventListener('click', evt => {
			evt.target.classList.toggle("element__scription-button_active");
		})

		const image = card.querySelector('.element__image');
		image.addEventListener('click', evt => {
			this._openImageCallback(this._name, this._link);
		})
	};

	create = () => {
		const card = document.querySelector(this._templateSelector).content.cloneNode(true);

		const title = card.querySelector('.element__scription-title');
		title.textContent = this._name;

		const image = card.querySelector('.element__image');
		image.src = this._link;
		image.alt = this._name;

		this._setListeners(card);

		return card;
	};
}