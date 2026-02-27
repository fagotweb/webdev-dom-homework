/* eslint-disable prettier/prettier */
import { comments } from './comments.js'
import { handlePostClick } from './handlePostClick.js'

export const likesCounterEl = document.querySelector('.likes-counter')
// export const likeButtonEl = document.querySelector('.like-button')

export function buttonEventListener() {
    const addFormNameEl = document.querySelector('.add-form-name')
    const addFormTextEl = document.querySelector('.add-form-text')

    function addFormName() {
        addFormNameEl.addEventListener('click', () => {
            addFormNameEl.style.backgroundColor = 'white'
        })
    }

    function addFormText() {
        addFormTextEl.addEventListener('click', () => {
            addFormTextEl.style.backgroundColor = 'white'
        })
    }

    function button() {
        const buttonEl = document.querySelector('.add-form-button')
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

            document.querySelector('.loading').style.display = 'block'
            document.querySelector('.add-form').style.display = 'none'

            handlePostClick()
        })
    }
    addFormName()
    addFormText()
    button()
}
