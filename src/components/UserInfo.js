export default class UserInfo {
	constructor(config) {
    this._config = config;
    
    this._create();
	}

  _create = () => {
    this._name = document.querySelector(this._config.nameSelector);
    this._about = document.querySelector(this._config.aboutSelector);
    this._avatar = document.querySelector(this._config.avatarSelector);
    this._button = document.querySelector(this._config.buttonSelector);
    this._cardButton = document.querySelector(this._config.cardButtonSelector);
    this._avatarButton = document.querySelector(this._config.avatarButtonSelector);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get about() {
    return this._about;
  }

  get avatar() {
    return this._avatar;
  }

  get button() {
    return this._button;
  }

  get cardButton() {
    return this._cardButton;
  }

  get avatarButton() {
    return this._avatarButton;
  }

  updateUserInfo = (data) => {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
    this._id = data._id;
  }

  updateUserAvatar = (data) => {
    this._avatar.src = data.avatar;
  }
}