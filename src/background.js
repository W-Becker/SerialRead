/* background file
   runs behind app window
   
   author: Will Becker, Iowa State University
   created for use by CrossOver SafeHelmet project
   for ENGR 466 (Multidisciplinary Engineering Design)   */

//App screen dimensions:
var screenWidth  = screen.width;
var screenHeight = screen.height;

//Create app window on launch
chrome.app.runtime.onLaunched.addListener(function() {
  //creates app window using specified html document
  chrome.app.window.create('serialRead_GUI.html', {
	//sets window size (maximized)
    width: screenWidth,
    height: screenHeight,
    //state: "fullscreen" //to run as fullscreen, delete // at beginning of line
  });
  //function to be run when the app window is closed (not required)
  chrome.app.window.current().onClosed.addListener(function(){
	//close any open serial port somehow
  });
});