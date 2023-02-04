export default class UserInfo {
  constructor(config) {
    this._config = config;

    this._create();
  }

  _create = () => {
    this._name = document.querySelector(this._config.nameSelector);
    this._job = document.querySelector(this._config.jobSelector);
    this._editButton = document.querySelector(this._config.editButtonSelector);
    this._addButton = document.querySelector(this._config.addButtonSelector);
  }

  get editButton() {
    return this._editButton;
  }

  get addButton() {
    return this._addButton;
  }

  getUserInfo = () => {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo = (data) => {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}