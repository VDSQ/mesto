export default class Api {
	constructor(config) {
		this._config = config;
	}

  _parseResult = (result) => {
    if (result) { return result.json(); }

    return Promise.reject("Ошибка: ".concat(result.status));
  }

  getUserInfo() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`, 
      {
        method: "GET",
        headers: this._config.headers,
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Данные пользователя не загрузились. ".concat(error));
      });
  }

  updateUserInfo(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.users}`, 
      {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Данные пользователя не обновились. ".concat(error));
      });
  }

  updateUserAvatar(data) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.avatar}`, 
      {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Аватар пользователя не обновился. ".concat(error));
      });
  }

  getInitialCards() {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}`, 
      {
        method: "GET",
        headers: this._config.headers,
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Карточки пользователей не загрузились. ".concat(error));
      });
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
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Карточка не загрузилась. ".concat(error));
      });
  }

  deleteCard(id) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.cards}/${id}`, 
      {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Карточка не удалилась. ".concat(error));
      });
  }

  setLike(id) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.likes}/${id}`, 
      {
        method: "PUT",
        headers: this._config.headers,
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Не удалось установить like карточки. ".concat(error));
      });
  }

  deleteLike(id) {
    return fetch(`${this._config.baseUrl}${this._config.endpoints.likes}/${id}`, 
      {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then((result) => this._parseResult(result))
      .catch((error) => {
        console.error("Не удалось удалить like у карточки. ".concat(error));
      });
  }
}