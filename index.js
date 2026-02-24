import { renderComments } from './modules/renderComments.js'
import { addFormName } from './modules/addEventListener.js'
import { addFormText } from './modules/addEventListener.js'
import { button } from './modules/addEventListener.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'

document.querySelector('.comments').innerHTML = 'Подождите, идет загрузка.'

fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})

addFormName()
addFormText()

button()
