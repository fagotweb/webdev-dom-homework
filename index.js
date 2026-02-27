/* eslint-disable prettier/prettier */
import { renderComments } from './modules/renderComments.js'
import { updateComments } from './modules/comments.js'
import { fetchComments } from './modules/api.js'
             
export const fetchAndRender = (isFirstLoading) => {
    if (isFirstLoading) {
            document.querySelector('.container').innerHTML =
                `<p>Подождите, идет загрузка.</p>`
        }

    fetchComments().then((data) => {        
        updateComments(data)
        renderComments()
    })
}

fetchAndRender(true)
