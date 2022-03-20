export const BASE_URL = 'https://api.pinakoladda.nomoredomains.work';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Register Error');
    }

    return response.json();
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  .then((response) => {
    console.log(response);

    if (!response.ok) {
      throw new Error('Authorize Error');
    }

    return response.json();
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then((response) => {
    console.log(response);

    if (!response.ok) {
      throw new Error('Logout Error');
    }

    return response.json();
  });
};

