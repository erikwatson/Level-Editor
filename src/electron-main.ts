const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer')
const { app, BrowserWindow } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setIcon('dest/images/icon.png')
  win.loadFile('dest/index.html')

  win.webContents.openDevTools()
}

app
  .whenReady()
  .then(() =>
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      loadExtensionOptions: { allowFileAccess: true },
      forceDownload: true
    })
  )
  .then(name => console.log(`Added extension: ${name}`))
  .then(() => {
    console.log('created the window')
    createWindow()
  })
  .catch(err => {
    console.error(err)
  })
