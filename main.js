const { app, BrowserWindow } = require('electron')

const express = require('express')
const appExpress = express()

appExpress.get('/', function (req, res) {
  res.send('Hello World!')
})

appExpress.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


let win;

let production = true;

const url = "http://localhost:4200";

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `/home/michal/emot.png`
  })

  if(production === true){
    win.loadURL(`file://${__dirname}/dist/index.html`)
    // Event when the window is closed.
    win.on('closed', function () {
      win = null
    })

  } else{
    win.loadURL(url);
    //// uncomment below to open the DevTools.
    win.webContents.openDevTools()
    // Event when the window is closed.
    win.on('closed', function () {
      win = null
    })
  }
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
