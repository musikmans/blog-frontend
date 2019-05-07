// Requests
import Cookies from 'universal-cookie';
const BASE_URL = `http://localhost:8000/api`;

export const Article = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
      credentials: "include"
    }).then(res => res.json());
  },
};

export const Session = {
  destroy() {
    const cookies = new Cookies();
    const key = cookies.remove('Authorization');
    return fetch(`${BASE_URL}/logout`, {
      method: "DELETE",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + key
    }).then(res => res.json());
  }
};

export const User = {
  current() {
    const cookies = new Cookies();
    const key = cookies.get('Authorization');
      return fetch(`${BASE_URL}/users/current`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + key
        },
      }).then(res => res.json());

}
};