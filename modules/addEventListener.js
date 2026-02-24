import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { comments } from './comments.js'
import { postComment } from './api.js'
export const commentsEl = document.querySelector('.comments')
export const likesCounterEl = document.querySelector('.likes-counter')
export const likeButtonEl = document.querySelector('.like-button')
export const addFormTextEl = document.querySelector('.add-form-text')
const buttonEl = document.querySelector('.add-form-button')
const addFormNameEl = document.querySelector('.add-form-name')

export function addFormName() {
    addFormNameEl.addEventListener('click', () => {
        addFormNameEl.style.backgroundColor = 'white'
    })
}

export function addFormText() {
    addFormTextEl.addEventListener('click', () => {
        addFormTextEl.style.backgroundColor = 'white'
    })
}

const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&lt;')
}

export function button() {
    buttonEl.addEventListener('click', () => {
        comments.name = addFormNameEl.value
        if (addFormNameEl.value === '') {
            addFormNameEl.style.backgroundColor = 'red'
            return
        }

        comments.comment = addFormTextEl.value
        if (addFormTextEl.value === '') {
            addFormTextEl.style.backgroundColor = 'red'
            return
        }

        let now = new Date()
        let dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.toLocaleString('default', { year: '2-digit' })}   ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
        comments.data = dateStr

        postComment(
            sanitizeHtml(addFormTextEl.value),
            sanitizeHtml(addFormNameEl.value),
        ).then((data) => {
            updateComments(data)
            renderComments()
            addFormTextEl.value = ''
            addFormNameEl.value = ''
        })
    })
}
