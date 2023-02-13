export default class UserInfo {
  constructor(config, api) {
    this._config = config;
    this._api = api;

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

  getUserInfo = () => {
    return this._api.getUserInfo()
      .then((res) => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        this._avatar.src = res.avatar;
        this._avatar.alt = res.name;
        this._id = res._id;
      })
      .catch((err) => console.log("Ошибка: Данные пользователя не загрузились ".concat(err)));
  }

  setUserInfo = (data) => {
    return this._api.setUserInfo(data)
      .then((res) => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        this._avatar.alt = res.name;
      })
      .catch((err) => console.log("Ошибка: Данные пользователя не обновились ".concat(err)));
  }

  setUserAvatar = (data) => {
    return this._api.setUserAvatar(data)
      .then((res) => this._avatar.src = res.avatar)
      .catch((err) => console.log("Ошибка: Аватар пользователя не обновился ".concat(err)));
  }
}