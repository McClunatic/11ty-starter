import { logSearchResults, setSearchResults } from './modules/lunr.js'

const form = document.querySelector('form')
form.addEventListener('submit', setSearchResults)

const dialogButton = document.querySelector('#search-close')
dialogButton.addEventListener('click', function() {
  document.querySelector('#search-input').value = ''
  document.querySelector('#search-dialog').close()
})


const dialog = document.querySelector('#search-dialog')
dialog.addEventListener('close', function() {
  document.querySelector('body > div').classList.remove('modal-open')
})
dialog.addEventListener('cancel', function() {
  document.querySelector('body > div').classList.remove('modal-open')
})