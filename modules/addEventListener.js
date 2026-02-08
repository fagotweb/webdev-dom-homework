import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
export const commentsEl = document.querySelector('.comments')
export const commentEl = document.querySelector('.comment')
export const likesCounterEl = document.querySelector('.likes-counter')
export const likeButtonEl = document.querySelector('.like-button')
export const commentTextEl = document.querySelector('.comment-text')
export const nameEl = document.querySelector('.name')
export const dateEl = document.querySelector('.date')
const buttonEl = document.querySelector('.add-form-button')
const addFormNameEl = document.querySelector('.add-form-name')
export const addFormTextEl = document.querySelector('.add-form-text')

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

export function button() {
    buttonEl.addEventListener('click', () => {
        nameEl.textContent = addFormNameEl.value
        if (addFormNameEl.value === '') {
            addFormNameEl.style.backgroundColor = 'red'
            return
        }

        commentTextEl.textContent = addFormTextEl.value
        if (addFormTextEl.value === '') {
            addFormTextEl.style.backgroundColor = 'red'
            return
        }

        let now = new Date()
        let dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.toLocaleString('default', { year: '2-digit' })}   ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
        dateEl.textContent = dateStr

        const newComments = {
            name: addFormNameEl.value
                .replaceAll('<', '&lt')
                .replaceAll('>', '&gt'),
            comment: addFormTextEl.value
                .replaceAll('<', '&lt')
                .replaceAll('>', '&gt'),
            data: dateStr,
            like: 0,
            class: 'like-button',
        }
        comments.push(newComments)
        addFormNameEl.value = ''
        addFormTextEl.value = ''
        renderComments()
    })
}
