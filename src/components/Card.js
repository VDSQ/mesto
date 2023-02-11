export default class Card {
	constructor(name, link, config, openImageCallback) {
		this._name = name;
		this._link = link;
		this._config = config;
		this._openImageCallback = openImageCallback;
		
		this._create();
	}

	_delete = (evt) => {
		this._card.remove();
	}

	_toggleLike = (evt) => {
		evt.target.classList.toggle(this._config.activeLikeButtonClass);
	};

	_handleImageClick = (evt) => {
		this._openImageCallback(this._name, this._link);
	};

	_setEventListeners = () => {
		this._deleteButton.addEventListener("click", this._delete);
		this._likeButton.addEventListener("click", this._toggleLike);
		this._image.addEventListener("click", this._handleImageClick);
	};

	_createCard = () => {
		return document.querySelector(this._config.templateSelector).content.querySelector(this._config.cardSelector).cloneNode(true);
	}

	_create = () => {		
		this._card = this._createCard();
		this._title = this._card.querySelector(this._config.titleSelector);
		this._image = this._card.querySelector(this._config.imageSelector);
		this._deleteButton = this._card.querySelector(this._config.deleteButtonSelector);
		this._likeButton = this._card.querySelector(this._config.likeButtonSelector);

		this._title.textContent = this._name;
		this._image.alt = this._name;
		this._image.src = this._link;

		this._setEventListeners();
	};

	get card() {
		return this._card;
	}
}