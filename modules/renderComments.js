import { likesListeners } from './likesListeners.js'
import { CommentListeners } from './CommentListeners.js'
import { comments } from './comments.js'
import {
    commentsEl,
    commentEl,
    nameEl,
    dateEl,
    likeButtonEl,
    likesCounterEl,
    commentTextEl,
} from './addEventListener.js'

export const renderComments = () => {
    const commentsHtml = comments
        .map((comments, index) => {
            nameEl.textContent = comments.name
            commentTextEl.textContent = comments.comment
            dateEl.textContent = comments.data
            likesCounterEl.textContent = comments.like
            likesCounterEl.dataset.index = `${index}`
            likeButtonEl.dataset.index = `${index}`
            likeButtonEl.className = comments.class
            const Html = commentEl.innerHTML
            return `<li data-index="${index}" class="comment">` + Html + `</li>`
        })
        .join('')
    commentsEl.innerHTML = commentsHtml
    likesListeners()
    CommentListeners()
}
