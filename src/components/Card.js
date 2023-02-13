export default class Card {
  constructor(profileId, data, config, openImageCallback, confirmCallback, api) {
    this._profileId = profileId;
    this._data = data;
    this._config = config;
    this._openImageCallback = openImageCallback;
    this._confirmCallback = confirmCallback;
    this._api = api;

    this._create();
  }

  _delete = () => {
    return this._api.deleteCard({ _id: this._data._id })
      .then((res) => this._card.remove())
      .catch((err) => console.log("Ошибка: Карточка не удалилась ".concat(err)));
  }

  _toggleLike = (evt) => {
    if (!this._likeButton.classList.contains(this._config.activeLikeButtonClass)) {
      this._api.setLike({ _id: this._data._id })
        .then((res) => this._likeAmount.textContent = res.likes.length)
        .catch((err) => console.log("Ошибка: Не удалось установить like ".concat(err)));
    } else {
      this._api.deleteLike({ _id: this._data._id })
        .then((res) => this._likeAmount.textContent = res.likes.length)
        .catch((err) => console.log("Ошибка: Не удалось удалить like ".concat(err)));
    }

    evt.target.classList.toggle(this._config.activeLikeButtonClass);
  };

  _handleImageClick = () => {
    this._openImageCallback(this._data.name, this._data.link);
  };

  _setEventListeners = () => {
    this._deleteButton.addEventListener("click", () => {
      this._confirmCallback()
        .then((res) => {
          if (res) {
            this._delete();
          }
        });
    });
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