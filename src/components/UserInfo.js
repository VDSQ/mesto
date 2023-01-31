export default class UserInfo {
	constructor(config) {
    this._config = config;
    this._name = document.querySelector(`.${this._config.nameSelector}`);
    this._job = document.querySelector(`.${this._config.jobSelector}`);
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