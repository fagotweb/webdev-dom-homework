/* eslint-disable prettier/prettier */
export const container = document.querySelector('.container')
// import { fetchAndRender } from '/index.js'
import { comments} from './comments.js'
import { buttonEventListener } from './addEventListener.js'
import { likesListeners } from './likesListeners.js'
import { CommentListeners } from './CommentListeners.js'
import { renderLogin } from './renderLogin.js'
import { name, token } from './api.js'

export const renderComments = () => {
    let isLike = 'like-button -active-like'
    let isLikeLoading = '-loading-like'

    const commentsHtml = comments
        .map((comments, index) => {
            if (comments.isLikes === false) {
                isLike = 'like-button'
            } else {
                isLike = 'like-button -active-like'
            }
            if (comments.isLikesLoading === false) {
                isLikeLoading = '-loading-like'
            } else {
                isLikeLoading = ''
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
                        <button data-index="${index}" class="${isLike} ${isLikeLoading}"></button>
                    </div>
                </div>
            </li>`
        })
        .join('')

    const addCommentsHtml = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                    id="name-input"

                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="loading" style="display: none;">
                Ждите, идет загрузка...
            </div>
            `
    const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHtml = `
            <ul class="comments">${commentsHtml}</ul>
            ${token ? addCommentsHtml : linkToLoginText}
            `
    container.innerHTML = baseHtml

    if (token) {
        // fetchAndRender()
        buttonEventListener()
        likesListeners()
        CommentListeners()
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}
