// Requests

const BASE_URL = `http://localhost:8000/api`;

const Article = {
  all() {
    return fetch(`${BASE_URL}/posts`, {
    }).then(res => res.json());
  },
};

export {Article};