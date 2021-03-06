// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('running'); //debug
  //createWindow();
  console.log('created window, running date function'); //debug
  runDate();
  //test();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function runDate() {
  let hours, minutes, seconds;
  for (let hours = 0; hours < 24; hours++) {
    hours = updateHours();
    for(let minutes = 0; minutes < 60; minutes++) {
      minutes = updateMinutes();
      for(let seconds = 0; seconds < 60; seconds++) {
        seconds = updateSeconds();
        console.log("The current time is: " + hours + " " + minutes + " " + seconds); //for debug uses in the future, logs to console when running through npm start
        //console.log(seconds.length, seconds);
        sleep(20);
      }
    }
  }
}

//these three functions do exactly their description, they update the hours, minutes and seconds on the clock
function updateHours() {
  let now = new Date();
  let hours = String(now.getHours());
  return hours;
}
function updateMinutes() {
  let now = new Date();
  let minutes = String(now.getMinutes());
  return minutes;
}
function updateSeconds() {
  let now = new Date();
  let seconds = String(now.getSeconds());
  if (seconds.length == 1) {
    seconds = '0'+String(seconds);
  }
  return seconds;
}

//this function blocks any action until it finishes, basically making EVERYTHING wait for it to finish
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//function for testing stuff, should not run in normal cycle
function test() {
  while (true) {
    let now = new Date;
    let milli = String(now.getTime());
    console.log(milli);
  }
}
