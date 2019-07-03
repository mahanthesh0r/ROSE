// Modules to control application life and create native browser window
const {app, BrowserWindow,electron} = require('electron')
const remote = require('electron').remote;
var ipcMain = require('electron').ipcMain;
var newWindow = null;
var fs = require('fs');




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null

    
  })
}
ipcMain.on('newWindow',function(e,fileName){
  if(newWindow){
    newWindow.focus(); //focus to new window
    return;
}
newWindow = new BrowserWindow({//1. create new Window
  height: 600, width: 800,
  minHeight: 600, minWidth: 800,
  
  
   
}); 

// newWindow.loadURL(url.format({ //2. Load HTML into new Window
//   pathname: path.join(__dirname, fileName),
//   protocol: 'file',
//   slashes: true
// }));
newWindow.loadFile(fileName);

newWindow.once('ready-to-show', () => { //when the new window is ready, show it up
  newWindow.show()
})

newWindow.on('closed', function() { //set new window to null when we're done
  newWindow = null
})

mainWindow.close(); //close the login window(the first window)

})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var stats = fs.statSync("device_id.txt")
var filesize = stats["size"];
console.log(filesize);
if(filesize==0){
  const device_id = uuidv4();
  fs.writeFileSync("device_id.txt",device_id);
}











