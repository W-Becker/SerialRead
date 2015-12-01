var connectionId;
var stringReceived = '';

$(document).ready(function() {
    chrome.serial.getDevices(function(devices) {

        for (var i = 0; i < devices.length; i++) {
            console.log(devices[i].path);
        }
    });

    // ui hook
    $('#run').click(function() {
        var clicks = $(this).data('clicks');

        if (!clicks) {
            var port = "COM" + $('#port').val();
            chrome.serial.connect(port, {bitrate: 115200}, function(info) {
                connectionId = info.connectionId;
                $("#run").html("Stop");
                console.log('Connection opened with id: ' + connectionId + ', Bitrate: ' + info.bitrate);
				chrome.serial.onReceive.addListener(function(info) {
					if (info.data) {
						var str = String.fromCharCode.apply(null, new Uint8Array(info.data));
						$("#data").val($("#data").val() + str);
					}
				});
            });
        } else {
            chrome.serial.disconnect(connectionId, function(result) {
                $("#run").html("Run");
                console.log('Connection with id: ' + connectionId + ' closed');
            });
        }

        $(this).data("clicks", !clicks);
    });
});