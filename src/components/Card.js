export default class Card {
	constructor(
    profileId, data, config, openImageCallback, 
    confirmCallback, setLikeCallback, deleteLikeCallback
  ) {
		this._profileId = profileId;
		this._data = data;
		this._config = config;
		this._openImageCallback = openImageCallback;
    this._confirmCallback = confirmCallback;
    this._setLikeCallback = setLikeCallback;
    this._deleteLikeCallback = deleteLikeCallback;
		
		this._create();
	}

  _delete = () => {
    this._card.remove();
  }

  _setLikeButtonState = (amount) => {
    this._likeButton.classList.toggle(this._config.activeLikeButtonClass);
    this._likeAmount.textContent = amount;
  }

	_toggleLike = (evt) => {
    if (!this._likeButton.classList.contains(this._config.activeLikeButtonClass)) {
      this._setLikeCallback(this._data._id, this._setLikeButtonState);
    } else {
      this._deleteLikeCallback(this._data._id, this._setLikeButtonState);
    }
	};

	_handleImageClick = () => {
		this._openImageCallback(this._data.name, this._data.link);
	};

	_setEventListeners = () => {
    if (this._data.owner._id === this._profileId) {
      this._deleteButton.addEventListener("click", () => this._confirmCallback(this._data._id, this._card));
    }

		this._likeButton.addEventListener("click", this._toggleLike);
		this._image.addEventListener("click", this._handleImageClick);
	};

	_createCard = () => {
		const card = document.querySelector(this._config.templateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
		
		if (this._profileId === this._data.owner._id) {
			card.querySelector(this._config.deleteButtonSelector).style.display = "block";
		}

		return card;
	}

	_create = () => {		
		this._card = this._createCard();
		this._title = this._card.querySelector(this._config.titleSelector);
		this._image = this._card.querySelector(this._config.imageSelector);
		this._deleteButton = this._card.querySelector(this._config.deleteButtonSelector);
		this._likeButton = this._card.querySelector(this._config.likeButtonSelector);  
		this._likeAmount = this._card.querySelector(this._config.likeAmountSelector);

    if (this._data.likes.some((profile) => profile._id === this._profileId)) {
      this._likeButton.classList.add(this._config.activeLikeButtonClass);
    }

		this._title.textContent = this._data.name;
		this._image.alt = this._data.name;
		this._image.src = this._data.link;
		this._likeAmount.textContent = this._data.likes.length;

		this._setEventListeners();
	};

	get card() {
		return this._card;
	}
}