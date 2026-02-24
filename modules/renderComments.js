import { likesListeners } from './likesListeners.js'
import { CommentListeners } from './CommentListeners.js'
import { comments } from './comments.js'
import { commentsEl } from './addEventListener.js'

export const renderComments = () => {
    let isLike = 'like-button -active-like'
    const commentsHtml = comments
        .map((comments, index) => {
            if (comments.isLikes === false) {
                isLike = 'like-button'
            } else {
                isLike = 'like-button -active-like'
            }
            let dateStr = `${String(comments.date.getDate()).padStart(2, '0')}.${String(comments.date.getMonth() + 1).padStart(2, '0')}.${comments.date.toLocaleString('default', { year: '2-digit' })}   ${String(comments.date.getHours()).padStart(2, '0')}:${String(comments.date.getMinutes()).padStart(2, '0')}`
            return `<li class="comment">
                <div class="comment-header">
                    <div class="name">${comments.name}
                    </div>
                    <div class="date">${dateStr}
                    </div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${comments.text}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span data-index="${index}" class="likes-counter">${comments.likes}
                        </span>
                        <button data-index="${index}" class="${isLike}"></button>
                    </div>
                </div>
            </li>`
        })
        .join('')
    commentsEl.innerHTML = commentsHtml

    likesListeners()
    CommentListeners()
}
