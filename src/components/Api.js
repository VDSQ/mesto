export default class Api {
  constructor(config) {
    this._config = config;
  }

  _parseResult = (res) => {
    if (res) { return res.json(); }

    return Promise.reject("Ошибка: ".concat(res.status));
  }

  getUserInfo() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`,
      {
        method: "GET",
        headers: this._config.headers,
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  setUserInfo(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`,
      {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  setUserAvatar(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.avatar}`,
      {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}`,
      {
        method: "GET",
        headers: this._config.headers,
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  setCard(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}`,
      {
        method: "POST",
        headers: this._config.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  deleteCard(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}/${data._id}`,
      {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  setLike(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.likes}/${data._id}`,
      {
        method: "PUT",
        headers: this._config.headers,
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }

  deleteLike(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.likes}/${data._id}`,
      {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then((res) => this._parseResult(res))
      .catch((err) => console.log(err));
  }
}