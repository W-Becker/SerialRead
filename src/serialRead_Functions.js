/* file for functions other than reading (saving, refreshing)
   author: Will Becker, Iowa State University
   created for use by CrossOver SafeHelmet project
   for ENGR 466 (Multidisciplinary Engineering Design) */

/*
 jquery function, runs when the html document has loaded
*/
$(document).ready(function() {
	
	//runs save function (see below) when save button is clicked
	$("#save").click(function() {
		saveToFile();
	});
	
	//clears data textarea when reset button is clicked
	$("#clear").click(function() {
		//sets textarea text to an empty string (clears)
		$("#data").val("");
		console.log("Data cleared from serial monitor.");
		//reloads app (to avoid bugginess with subsequent reads)
		chrome.runtime.reload();
		//other failed attempts to avoid bugginess
		//location.reload();
		//var button = document.createElement('button');
		//button.onClick="history.go(0)";
		//button.click();
		//console.log(button.onClick);
	});
	
});

/*
	Save the data to .csv file for use in Excel
	Adapted from code provided by Shiva Saxena at http://jsfiddle.net/shivasaxena/qnYk4/3/
*/
function saveToFile() {
	
	var data = [];
	//gets filename from text box
	//filename can still be changed in save dialog
	var filename = $("#filename").val();
	
	//adds data from textarea to data array
	data.push($("#data").val());
	
	//runs save as functionality
	var blob = new Blob([data.toString()], {
		type: "text/plain;charset=utf-8"
	});
	var url = URL.createObjectURL(blob);
	
	var a = document.createElement('a');
	a.download = filename + ".csv";
	a.href = url;
	a.textContent = "Download " + filename + ".csv";
	a.click();
	
	console.log("Data saved to " + filename + ".csv.");
	
}