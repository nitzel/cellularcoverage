function test_speed() {
	SomApi.account = "SOM5645ad2eec3af"; //your API Key here
	SomApi.domainName = "marcus.mringelborn.com"; //your domain or sub-domain here
	SomApi.config.sustainTime = 4;
	SomApi.config.userInfoEnabled = false;
	SomApi.config.progress.verbose = true;
	
	SomApi.onTestCompleted = function(testResult) {
		$('#speed').html("Download: " +testResult.download +"Mbps <br/>");
		$('#speed').append("Upload: " +testResult.upload +"Mbps <br/>");
		$('#speed').append("Latency: " +testResult.latency +"ms <br/>");
		$('#speed').append("Jitter: " +testResult.jitter +"ms <br/>");
		$('#speed').append("Test Server: "+testResult.testServer +"<br/>");
		$('#speed').append("IP: " +testResult.ip_address +"<br/>");
		$('#speed').append("Hostname: " +testResult.hostname +"<br/>");
	};
	
	SomApi.onProgress = function(progress) {
		$('#speed').html("Type: "+progress.type+"<br/>");
		$('#speed').append("Pass: "+progress.pass+"<br/>");
		$('#speed').append("Done: "+progress.percentDone+"%<br/>");
		$('#speed').append("Speed: "+progress.currentSpeed+" Mbps<br/>");
	}
	
	SomApi.onError = function(error) {
		console.log(error.message);
	};
	
	$(function(){
		console.log("Starting test");
		SomApi.startTest();
	});
}