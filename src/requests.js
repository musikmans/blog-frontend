// Requests

const BASE_URL = `http://localhost:8000/api`;

export const Article = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
      credentials: "include"
    }).then(res => res.json());
  },
};

export const Session = {
  create(params) {
    return fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  destroy() {
    return fetch(`${BASE_URL}/logout`, {
      method: "DELETE",
      credentials: "include"
    }).then(res => res.json());
  }
};

export const User = {
  current() {
    return fetch(`${BASE_URL}/users/current`, {
      credentials: "include"
    }).then(res => res.json());
  }
};