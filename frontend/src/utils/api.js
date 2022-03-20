class Api {
  constructor({baseUrl, params}) {
   this._baseUrl = baseUrl;
   this._params = params
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', this._params).then(this._parseResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      ...this._params,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._parseResponse);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      ...this._params,
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    }).then(this._parseResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', this._params).then(this._parseResponse)
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      ...this._params,
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._parseResponse)
  }

  deleteCard = (cardId) => {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      ...this._params,
      method: 'DELETE',
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
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      ...this._params,
      method: 'PUT',
    }).then(this._parseResponse);
  }

  deleteLike = (cardId) => {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      ...this._params,
      method: 'DELETE',
    }).then(this._parseResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.pinakoladda.nomoredomains.work",
  params: {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  },
});