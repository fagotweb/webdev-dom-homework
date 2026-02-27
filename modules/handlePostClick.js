/* eslint-disable prettier/prettier */
import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { postComment } from './api.js'

const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&lt;')
}

export const handlePostClick = () => {
    const addFormTextEl = document.querySelector('.add-form-text')
    const addFormNameEl = document.querySelector('.add-form-name')
    postComment(
        sanitizeHtml(addFormTextEl.value),
        sanitizeHtml(addFormNameEl.value),
    )
        .then((data) => {
            document.querySelector('.loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'
            updateComments(data)
            renderComments()
            addFormTextEl.value = ''
            addFormNameEl.value = ''
        })
        .catch((error) => {
            document.querySelector('.loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте позже')
            }

            if (error.message === 'Ошибка сервера') {
                handlePostClick()
            }

            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий должны быть не короче 3х символов')
            }

            addFormNameEl.style.border = '1px solid red'
            addFormTextEl.style.border = '1px solid red'

            setTimeout(() => {
                addFormNameEl.style.border = 'none'
                addFormTextEl.style.border = 'none'
            }, 2000)
        })
}
