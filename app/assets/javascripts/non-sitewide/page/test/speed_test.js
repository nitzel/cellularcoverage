SomApi.account = "SOM5645ad2eec3af"; //your API Key here
SomApi.domainName = "marcus.mringelborn.com"; //your domain or sub-domain here
SomApi.config.sustainTime = 5;
SomApi.config.userInfoEnabled = false;
SomApi.config.progress.verbose = true;

SomApi.onTestCompleted = function(testResult) {
	$('#output').html("Download: " +testResult.download +"Mbps <br/>");
	$('#output').append("Upload: " +testResult.upload +"Mbps <br/>");
	$('#output').append("Latency: " +testResult.latency +"ms <br/>");
	$('#output').append("Jitter: " +testResult.jitter +"ms <br/>");
	//$('#output').append("Test Server: "+testResult.testServer +"<br/>");
	//$('#output').append("IP: " +testResult.ip_address +"<br/>");
	//$('#output').append("Hostname: " +testResult.hostname +"<br/>");
	
	post_data(testResult);
	
	if (this.geolocation_enabled) {
		
		//console.log(this.coords);
		delete(this.coords);
	}
	//console.log(testResult);
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

function on_load() {
	// St to true by deafukt for testing purposes
	this.geolocation_enabled = true;
	if(navigator.connection && navigator.connection.type == 'cellular') {
		if (navigator.geolocation) {
			this.geolocation_enabled = true;
		} else {
			$("#info").html('Geolocation is not supported by this browser. You are not able to contribute.<br/>');
		}
	}
	else {
		$("#info").html('You need to be on a cellular network to be able to contribute.<br/>');
	}
}

function post_data(testResult) {
	console.log("post_data()");
	if(testResult == undefined) {
		console.log(testResult);
		return false;
	}
	
	max_up = 100;
	max_down = 100;
	
	quality = (testResult.upload/max_up + testResult.download/max_down) / 2;
	
	// To make sure: 0 ≤ quality ≤ 10
	if (quality > 10) {
		quality = 10;
	}
	else if (quality < 0) {
		quality = 0;
	}
	
	console.log("Quality: " + quality);
	
	measurement = {
		latitude: this.coords.latitude,
		longitude: this.coords.longitude,
		quality: quality
	};
	
	$.post("/measurement",
	{
		measurement: measurement
	},
	function( data ) {
		//on success
		console.log(data);
	});
}