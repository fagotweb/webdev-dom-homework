/* eslint-disable prettier/prettier */
const host = 'https://wedev-api.sky.pro/api/v2/:alex-zakoldaev'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Ошибка сервера')
            }
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте позже')
            }
            if (error.message === 'Ошибка сервера') {
                alert('Сервер не доступен, попробуйте позже')
            }
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                    isLikesLoading: true,
                }
            })

            return appComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text,
            name: name,
            // forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Ошибка сервера')
                }
                if (response.status === 400) {
                    throw new Error('Неверный запрос')
                }
            }
        })
        .then(() => {
            return fetchComments()
        })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({login: login, password: password})
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({name: name, login: login, password: password})
    })
}
