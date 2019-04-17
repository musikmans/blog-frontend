// Requests

const BASE_URL = `http://192.168.1.138:8000/api`;

const Article = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
    }).then(res => res.json());
  },
};

export {Article};