import { logSearchResults, setSearchResults } from './modules/lunr.js'
import highlightTerms from './modules/mark.js'

const darkModeButton = document.getElementById('dark-mode-btn')
darkModeButton.addEventListener('click', function () {
  document.documentElement.classList.toggle('dark')
})

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

if(document.readyState !== 'loading') {
  highlightTerms()
} else {
  document.addEventListener('DOMContentLoaded', function() {
    highlightTerms()
  })
}
