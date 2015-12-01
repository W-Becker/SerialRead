/*var isSerial = true;
var port = "COM" + $("#port").val();
var bitRate = 115200;
var isPersistent = false;
var updateRate=50;
var debugMode = false;
var analogPins = [];

var id = 0;*/

var port = "COM" + $("#port").val();
var bitRate = 115200;
var isPersistent = false;
var id = "0";
var i = 0;

$(document).ready(function() {
	
	$("#run").click(function() {
		
		i = (i + 1) % 2;
		if(i) {
			$("#run").innerHTML = "Stop";
			setPort();
		} else {
			$("#run").innerHTML = "Run";
			disconnectPort();
		}
	});
	
});

function setPort() {
	
	chrome.serial.connect(port, {connectionId: id, bitrate: bitRate, persistent: isPersistent, receiveTimeout: 60000}, 
		function() {
			
			console.log("Connected to " + port + ".")
			
		});
	
	chrome.serial.onReceive.addListener(function(id,data) {
		
		$("#data").val($("#data").val()+data);
		console.log(data);
		
	});
	
}

function disconnectPort() {
	
	chrome.serial.disconnect(id);
	console.log("Disconnected from " + port + ".");
	
}