// for livereload
require('electron-connect').client.create()

// require
const debug = require('debug')('app')
const ipc = require('electron').ipcRenderer


// File Dialog
const dirButton = document.getElementById('select-directory')
dirButton.addEventListener('click', (event) => {
  ipc.send('open-file-dialog')
})

ipc.on('selected-directory', (event, path) => {
  document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})
