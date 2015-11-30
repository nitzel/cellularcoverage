SomApi.account = "SOM5645ad2eec3af"; //your API Key here
SomApi.domainName = "marcus.mringelborn.com"; //your domain or sub-domain here
SomApi.config.sustainTime = 4;
SomApi.config.userInfoEnabled = false;
SomApi.config.progress.verbose = true;

SomApi.onTestCompleted = function(testResult) {
	$('#output').html("Download: " +testResult.download +"Mbps <br/>");
	$('#output').append("Upload: " +testResult.upload +"Mbps <br/>");
	$('#output').append("Latency: " +testResult.latency +"ms <br/>");
	$('#output').append("Jitter: " +testResult.jitter +"ms <br/>");
	$('#output').append("Test Server: "+testResult.testServer +"<br/>");
	$('#output').append("IP: " +testResult.ip_address +"<br/>");
	$('#output').append("Hostname: " +testResult.hostname +"<br/>");
	
	if (this.geolocation_enabled) {
		console.log(this.coords);
		delete(this.coords);
	}
	console.log(testResult);
};

SomApi.onProgress = function(progress) {
	$('#output').html("Type: "+progress.type+"<br/>");
	$('#output').append("Pass: "+progress.pass+"<br/>");
	$('#output').append("Done: "+progress.percentDone+"%<br/>");
	$('#output').append("Speed: "+progress.currentSpeed+" Mbps<br/>");
}

SomApi.onError = function(error) {
	console.log(error.message);
};

function test_speed() {
	geolocation_enabled = false;
	if(navigator.connection && navigator.connection.type == 'cellular') {
		if (navigator.geolocation) {
			geolocation_enabled = true;
		} else {
			$("#info").html('Geolocation is not supported by this browser. You are not able to contribute.<br/>');
		}
	}
	else {
		$("#info").html('You need to be on a cellular network to be able to contribute.<br/>');
	}
	if (geolocation_enabled) {
		console.log("Getting geolocation");
		if (!getLocation()) {
			console.log("No Geolocation found");
			return false;
		}
	}
	$("#info").append("Starting test");
	SomApi.startTest();
}