import { comments } from './comments.js'

export const CommentListeners = () => {
    const likeElements = document.querySelectorAll('li')
    const addFormTextEl = document.querySelector('.add-form-text')

    for (const commentEl of likeElements) {
        commentEl.addEventListener('click', () => {
            const index = commentEl.dataset.index
            addFormTextEl.value =
                comments[index].name + ' > ' + comments[index].comment
        })
    }
}
