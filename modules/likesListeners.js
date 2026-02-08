import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

export const likesListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')

    for (const likeButtonEl of likeButtonElements) {
        likeButtonEl.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeButtonEl.dataset.index
            if (comments[index].class === 'like-button') {
                comments[index].class = 'like-button -active-like'
                comments[index].like = Number(comments[index].like) + 1
            } else {
                comments[index].class = 'like-button'
                comments[index].like = Number(comments[index].like) - 1
            }
            renderComments()
        })
    }
}
