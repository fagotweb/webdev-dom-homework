/* eslint-disable prettier/prettier */
const host = 'https://wedev-api.sky.pro/api/v1/alex-zakoldaev'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
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
        body: JSON.stringify({
            text: text,
            name: name,
            // forceError: true,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json()} else {
                if (response.status === 500) {
                    throw new Error('Ошибка сервера')
                }
                if (response.status === 400) {
                    throw new Error('Неверный запрос')
                }
            }
    }).then(() => {
        return fetchComments()
    })
}
