i = 0;
$(document).ready(function() {
	
	$("#save").click(function() {
		saveToFile();
	});
	
	$("#clear").click(function() {
		$("#data").val("");
		console.log("Data cleared from serial monitor.");
	});
	
});

/*
	Save the data to .csv file
	Adapted from code provided by Shiva Saxena at http://jsfiddle.net/shivasaxena/qnYk4/3/
*/
function saveToFile() {
	
	var data = [];
	//gets filename from text box
	//filename can still be changed in save dialog
	var filename = $("#filename").val();
	
	//adds data from text area to data array
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
	//if the click() function dosen't work you can try using onclick() function like this
	//a.onclick();
	
	//document.getElementById('content').appendChild(a);
	console.log("Data saved to " + filename + ".csv.");
	
}