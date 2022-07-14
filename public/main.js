const {app,dialog, BrowserWindow} = require('electron') 
const path = require("path");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");

require('@electron/remote/main').initialize()

function createWindow(){

    const win=new BrowserWindow({
        width:1200,
        height:800,
        webPreferences:{
            enableRemoteModule: true
        }

    })
    win.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
    if (isDev) {
		win.webContents.openDevTools({ mode: "detach" });
		require('react-devtools-electron');
	};

	if (!isDev) {
		autoUpdater.checkForUpdates();
	};
}

app.on('ready',createWindow)

app.on('window-all-closed', function(){
    if(process.platform !='win32'){
        app.quit()
    }
})

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length===0) createWindow()
})

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Ok'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version is being downloaded.'
	}
	dialog.showMessageBox(dialogOpts, (response) => {

	});
})

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
});