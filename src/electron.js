const {app, BrowserWindow, nativeTheme} = require('electron');

const path = require('path');

const createWindow = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: !isProduction,
    },
  });

  if (isProduction) win.removeMenu();

  const url = isProduction ? `file://${path.join(__dirname, '../public/index.html')}` : 'http://localhost:8080';


  win.loadURL(url);
};

app.on('ready', createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
})
app.on("activate", () => {
  if (mainWindow === null) createWindow();
})