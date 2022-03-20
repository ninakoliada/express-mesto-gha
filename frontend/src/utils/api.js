class Api {
  constructor({baseUrl, headers}) {
   this._baseUrl = baseUrl;
   this._headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then(this._parseResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._parseResponse);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(this._parseResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then(this._parseResponse)
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._parseResponse)
  }

  deleteCard = (cardId) => {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._parseResponse);
  }

  changeLikeCardStatus(cardId, value) {
    if (value) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
  
  addLike = (cardId) => {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._parseResponse);
  }

  deleteLike = (cardId) => {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._parseResponse);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "4efaaa97-5e92-49c0-9da5-0bde0e3791b7",
    "Content-Type": "application/json",
  },
});