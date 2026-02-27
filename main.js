const { app, BrowserWindow } = require('electron');
const path = require('path');

// 禁止多开
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

function createWindow() {
  // 创建窗口
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 700,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'favicon.ico') // 可选：添加图标，没有则删除这行
  });

  // 加载HTML文件
  mainWindow.loadFile('值班调休记录.html');
  
  // 禁止打开开发者工具
  mainWindow.webContents.closeDevTools();
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 所有窗口关闭后退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});