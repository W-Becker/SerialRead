/* file for reading from the serial port
   author: Will Becker, Iowa State University
   created for use by CrossOver SafeHelmet project
   for ENGR 466 (Multidisciplinary Engineering Design) */

var connectionId;			//ID for the serial connection
var deviceList = [];		//list of connected devices

/*
 jquery function, runs when the html document has loaded
*/
$(document).ready(function() {
	//hides error message objects
	$("#errormessage").hide();
	$("#reset").hide();
	
	//function when the error message shows and ok button is clicked
	$("#reset").click(function() {
		console.log("Error message dismissed.");
		$("div").show();
		$("#errormessage").hide();
		$("#reset").hide();
	});
	
	//gets list of serial devices
    chrome.serial.getDevices(function(devices) {
        for (var i = 0; i < devices.length; i++) {
            console.log(devices[i].path);
			deviceList[i] = devices[i];
        }
    });

    //opens connection when run button is clicked
    $("#run").click(function() {
		//if no devices are connect, error message is shown
		if(deviceList.length < 1) {
			console.log("No device connected.");
			$("div").hide();
			$("#errormessage").show();
			$("#reset").show();
			
			return;
		}
		//keeps track of clicks on run button
        var clicks = $(this).data('clicks');
		
		//when 0 clicks (opens port and begins reading)
        if (!clicks) {
			//opens port according to what is in port text box
			var port = "" + $('#port').val();
			chrome.serial.connect(port, {bitrate: 57600}, function(info) {
				connectionId = info.connectionId;
				//changes run button text to Stop
				$("#run").html("Stop");
				console.log('Connection opened with id: ' + connectionId + ', Bitrate: ' + info.bitrate);
				chrome.serial.onReceive.addListener(function(info) {
					//if data is being read from port, it is added to textarea
					if (info.data) {
						//converts serial data to string
						var str = String.fromCharCode.apply(null, new Uint8Array(info.data));
						//appends data to textarea
						$("#data").val($("#data").val() + str);
					}
				});
			});
		//when 1 click (closes port)
        } else {
			//flushes data in serial port
            chrome.serial.flush(connectionId, function(result) {
				//changes stop button text back to Run
				$("#run").html("Run");
				console.log('Connection with id: ' + connectionId + ' flushed.')
				//closes serial connection
				chrome.serial.disconnect(connectionId,function() {
					console.log('Connection with id: ' + connectionId + ' closed');
				});
			});
        }
		
		//updates clicks tally
        $(this).data("clicks", !clicks);
    });
});