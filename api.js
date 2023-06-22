
const personalKey = "la4i";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error('Ошибка');
      }
    })
    .then((data) => {
      return data.posts;
    });
}
export function postPosts({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: `${description}`,
      imageUrl: `${imageUrl}`,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Ошибка");
    }
    return response.json();
  });
}
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export const likeApi = ({ postId, token }) => {
  return fetch(`${postsHost}/${postId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error('Лайк не поставлен')
      }
    });
};

export const dislikeApi = ({ postId, token }) => {
  return fetch(`${postsHost}/${postId}/dislike`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error('Лайк не поставлен')
      }
    });
};