export default class Card {
	constructor(name, link, config, openPopupImage) {
		this._name = name;
		this._link = link;
		this._config = config;
		this._openImageCallback = openPopupImage;
	}

	_deleteCard = (evt) => {
		evt.target.closest(`.${this._config.cardSelector}`).remove();
	}

	_toggleLike = (evt) => {
		evt.target.classList.toggle(`${this._config.activeLikeButtonSelector}`);
	};

	_handleImageClick = (evt) => {
		this._openImageCallback(this._name, this._link);
	};

	_setEventListeners = () => {
		this._deleteButton.addEventListener("click", this._deleteCard);
		this._likeButton.addEventListener("click", this._toggleLike);
		this._image.addEventListener("click", this._handleImageClick);
	};

	create = () => {
		this._card = document.querySelector(`#${this._config.templateSelector}`).content.cloneNode(true);
		this._title = this._card.querySelector(`.${this._config.titleSelector}`);
		this._image = this._card.querySelector(`.${this._config.imageSelector}`);
		this._deleteButton = this._card.querySelector(`.${this._config.deleteButtonSelector}`);
		this._likeButton = this._card.querySelector(`.${this._config.likeButtonSelector}`);

		this._title.textContent = this._name;
		this._image.alt = this._name;
		this._image.src = this._link;

		this._setEventListeners();

		return this._card;
	};
}