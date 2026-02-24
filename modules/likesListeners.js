import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export const likesListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')

    for (const likeButtonEl of likeButtonElements) {
        likeButtonEl.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeButtonEl.dataset.index
            comments[index].isLikesLoading = false
            renderComments()
            delay(2000).then(() => {
                comments[index].likes = comments[index].isLikes
                    ? comments[index].likes - 1
                    : comments[index].likes + 1
                comments[index].isLikes = !comments[index].isLikes
                comments[index].isLikesLoading = true
                renderComments()
            })
        })
    }
}
